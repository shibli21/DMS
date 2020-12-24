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
import { Course } from "./../entities/Course";
import { Department } from "./../entities/Department";
import { Semester } from "./../entities/Semester";
import { AddCourseInputType } from "./../types/InputTypes/AddCourseInputType";

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
    return Course.find();
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
