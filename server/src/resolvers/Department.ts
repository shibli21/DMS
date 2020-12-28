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
import { Department } from "./../entities/Department";

@ObjectType()
class DepartmentResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Department, { nullable: true })
  department?: Department;
}

@Resolver()
export class DepartmentResolver {
  @Query(() => [Department])
  departments(): Promise<Department[]> {
    return Department.find();
  }

  @UseMiddleware(isAdmin)
  @Mutation(() => DepartmentResponse)
  async addDepartment(
    @Arg("name") name: string,
    @Arg("code") code: string
  ): Promise<DepartmentResponse> {
    let errors = [];

    if (!code) {
      errors.push({
        field: "code",
        message: "Invalid code!",
      });
    }
    if (!name) {
      errors.push({
        field: "name",
        message: "Invalid name!",
      });
    }
    if (errors.length > 0) {
      return { errors };
    }

    let department;
    try {
      await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Department)
        .values({
          departmentCode: code,
          name: name,
        })
        .execute();

      department = await Department.findOne({
        where: { departmentCode: code },
      });
    } catch (error) {
      if (error.code === "23505") {
        return {
          errors: [
            {
              field: "code",
              message: "Department code already exists!",
            },
          ],
        };
      }
    }
    return { department };
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAdmin)
  async deleteDepartment(@Arg("code") code: string): Promise<boolean> {
    await Department.delete({
      departmentCode: code,
    });

    return true;
  }
}
