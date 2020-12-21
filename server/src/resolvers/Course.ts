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
import { Course } from "./../entities/Course";
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
          semester: input.semester,
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
