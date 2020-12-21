import { Faculty } from "./../entities/Faculty";
import { AssignCourseToFacultyInputType } from "./../types/InputTypes/AssignCourseToFaculty";
import { CourseAssignToFaculty } from "./../entities/CourseAssignToFaculty";
import { Department } from "./../entities/Department";
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
import { isAdmin } from "../middleware/isAdmin";
import { FieldError } from "../types/ObjectTypes/FieldErrorType";
import { Course } from "../entities/Course";

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
          semester: input.semester,
          session: input.session,
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
