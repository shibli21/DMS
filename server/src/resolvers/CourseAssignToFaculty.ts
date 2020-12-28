import {
  Arg,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { getConnection } from "typeorm";
import { Course } from "../entities/Course";
import { isAdmin } from "../middleware/isAdmin";
import { FieldError } from "../types/ObjectTypes/FieldErrorType";
import { CourseAssignToFaculty } from "./../entities/CourseAssignToFaculty";
import { Department } from "./../entities/Department";
import { Faculty } from "./../entities/Faculty";
import { Semester } from "./../entities/Semester";
import { Session } from "./../entities/Session";
import { AssignCourseToFacultyInputType } from "./../types/InputTypes/AssignCourseToFaculty";

@ObjectType()
class CourseAssignToFacultyResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => CourseAssignToFaculty, { nullable: true })
  courseAssignToFaculty?: CourseAssignToFaculty;
}

@Resolver()
export class CourseAssignToFacultyResolver {
  @Query(() => [CourseAssignToFaculty])
  courseAssignToFaculties(): Promise<CourseAssignToFaculty[]> {
    return CourseAssignToFaculty.find({
      relations: ["department", "faculty", "course"],
    });
  }

  @UseMiddleware(isAdmin)
  @Mutation(() => CourseAssignToFacultyResponse)
  async assignCourseToFaculty(
    @Arg("input") input: AssignCourseToFacultyInputType
  ): Promise<CourseAssignToFacultyResponse> {
    let errors = [];
    if (!input.courseCode) {
      errors.push({
        field: "courseCode",
        message: "Invalid course!",
      });
    }
    if (!input.departmentCode) {
      errors.push({
        field: "departmentCode",
        message: "Invalid Department!",
      });
    }
    if (!input.facultyId) {
      errors.push({
        field: "facultyId",
        message: "Faculty can't be empty!",
      });
    }

    if (!input.semesterId) {
      errors.push({
        field: "semesterId",
        message: "Semester can't be empty!",
      });
    }
    if (!input.sessionId) {
      errors.push({
        field: "sessionId",
        message: "Session can't be empty!",
      });
    }
    if (errors.length > 0) {
      return { errors };
    }

    const department = await Department.findOne({
      where: { departmentCode: input.departmentCode },
    });

    if (!department) {
      return {
        errors: [
          {
            field: "departmentCode",
            message: "Department doesn't exists!",
          },
        ],
      };
    }

    const course = await Course.findOne({
      where: {
        code: input.courseCode,
      },
    });

    if (!course) {
      return {
        errors: [
          {
            field: "courseCode",
            message: "Course doesn't exists!",
          },
        ],
      };
    }

    const semester = await Semester.findOne({
      where: { department: department, id: input.semesterId },
      relations: ["department"],
    });

    if (!semester) {
      return {
        errors: [
          {
            field: "semester",
            message: "Semester doesn't exists!",
          },
        ],
      };
    }

    const session = await Session.findOne({
      where: { id: input.sessionId },
    });

    if (!session) {
      return {
        errors: [
          {
            field: "session",
            message: "Session doesn't exists!",
          },
        ],
      };
    }

    const faculty = await Faculty.findOne({
      where: {
        id: input.facultyId,
      },
    });

    if (!faculty) {
      return {
        errors: [
          {
            field: "faculty",
            message: "Faculty doesn't exists!",
          },
        ],
      };
    }

    const courseAssignToFacultyExists = await CourseAssignToFaculty.findOne({
      where: {
        faculty: faculty,
        course: course,
        department: department,
        semester: semester,
        session: session,
      },
    });

    if (courseAssignToFacultyExists) {
      return {
        errors: [
          {
            field: "courseAssignToFacultyExists",
            message: "Already assigned",
          },
        ],
      };
    }
    let courseAssignToFaculty;
    try {
      const c = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(CourseAssignToFaculty)
        .values({
          faculty: faculty,
          course: course,
          department: department,
          semester: semester,
          session: session,
        })
        .returning("*")
        .execute();

      courseAssignToFaculty = await CourseAssignToFaculty.findOne({
        where: { id: c.raw[0].id },
        relations: ["department", "faculty", "course"],
      });
    } catch (error) {
      console.log(error.message);
    }
    return { courseAssignToFaculty };
  }
}
