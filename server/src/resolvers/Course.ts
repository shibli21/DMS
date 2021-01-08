import {
  Arg,
  Ctx,
  Field,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { getConnection } from "typeorm";
import { isAdmin } from "../middleware/isAdmin";
import { FieldError } from "../types/ObjectTypes/FieldErrorType";
import { Course } from "./../entities/Course";
import { Department } from "./../entities/Department";
import { Semester } from "./../entities/Semester";
import { Student } from "./../entities/Student";
import { isStudent } from "./../middleware/isStudent";
import { AddCourseInputType } from "./../types/InputTypes/AddCourseInputType";
import { MyContext } from "./../types/MyContext";

@ObjectType()
class CourseResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Course, { nullable: true })
  course?: Course;
}

@Resolver()
export class CourseResolver {
  @Query(() => [Course])
  courses(): Promise<Course[]> {
    return Course.find({
      relations: ["department", "assignedFaculty", "semester"],
    });
  }

  @Query(() => [Course])
  async coursesByDeptSemester(
    @Arg("code") code: string,
    @Arg("semesterId", () => Int) semesterId: number
  ): Promise<Course[]> {
    return Course.find({
      where: {
        department: await Department.findOne({
          where: {
            departmentCode: code,
          },
        }),
        semester: await Semester.findOne({
          where: {
            id: semesterId,
          },
        }),
      },
      relations: ["department", "semester"],
    });
  }

  @UseMiddleware(isStudent)
  @Query(() => [Course])
  async studentCoursesBySemester(
    @Arg("semesterId", () => Int) semesterId: number,
    @Ctx() { req }: MyContext
  ): Promise<Course[]> {
    const student = await Student.findOne({
      where: {
        id: req.studentId,
      },
      relations: ["department"],
    });

    return Course.find({
      where: {
        department: await Department.findOne({
          where: {
            departmentCode: student?.department.departmentCode,
          },
        }),
        semester: await Semester.findOne({
          where: {
            id: semesterId,
          },
        }),
      },
      relations: ["department", "semester"],
    });
  }

  @UseMiddleware(isAdmin)
  @Mutation(() => CourseResponse)
  async addCourse(
    @Arg("input") input: AddCourseInputType
  ): Promise<CourseResponse> {
    let errors = [];
    if (!input.name) {
      errors.push({
        field: "name",
        message: "Invalid name!",
      });
    }
    if (!input.code) {
      errors.push({
        field: "code",
        message: "Invalid code!",
      });
    }
    if (!input.description) {
      errors.push({
        field: "description",
        message: "Description can't be empty!",
      });
    }
    if (!input.credit || input.credit > 5 || input.credit === 0) {
      errors.push({
        field: "credit",
        message: "Invalid credit!",
      });
    }

    const department = await Department.findOne({
      where: { departmentCode: input.departmentCode },
    });

    if (!department) {
      errors.push({
        field: "departmentCode",
        message: "Department doesn't exists!",
      });
    }

    const semester = await Semester.findOne({
      where: { department: department, id: input.semesterId },
      relations: ["department"],
    });

    if (!semester) {
      errors.push({
        field: "semesterId",
        message: "Semester doesn't exists!",
      });
    }

    if (errors.length > 0) {
      return { errors };
    }

    let course;
    try {
      await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Course)
        .values({
          name: input.name,
          department: department,
          description: input.description,
          semester: semester,
          code: input.code,
          credit: input.credit,
        })
        .execute();

      course = await Course.findOne({
        where: { code: input.code },
        relations: ["department"],
      });
    } catch (error) {
      if (error.code === "23505") {
        return {
          errors: [
            {
              field: "code",
              message: "Course code already exists!",
            },
          ],
        };
      }
    }
    return { course };
  }
}
