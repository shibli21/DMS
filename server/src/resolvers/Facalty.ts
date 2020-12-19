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
import { AddFacultyInputType } from "../types/InputTypes/addFacultyInputType";
import { FieldError } from "../types/ObjectTypes/FieldErrorType";
import { generateRandomString } from "../utils/generateRandomString";
import { validateAddFaculty } from "../utils/validateAddFaculty";
import { Faculty } from "./../entities/Faculty";

@ObjectType()
class FacultyResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Faculty, { nullable: true })
  faculty?: Faculty;
}

@Resolver()
export class FacultyResolver {
  @Query(() => [Faculty])
  faculties(): Promise<Faculty[]> {
    return Faculty.find();
  }

  @UseMiddleware(isAdmin)
  @Mutation(() => FacultyResponse)
  async addFaculty(
    @Arg("input") input: AddFacultyInputType
  ): Promise<FacultyResponse> {
    const errors = await validateAddFaculty(input);
    if (errors) {
      return { errors };
    }

    const emailToLower = input.email.toLowerCase();

    let faculty;
    try {
      await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Faculty)
        .values({
          username: input.username,
          email: emailToLower,
          address: input.username,
          designation: input.designation,
          gender: input.username,
          contactNumber: input.contactNumber,
          oneTimePassword: generateRandomString(7),
        })
        .execute();

      faculty = await Faculty.findOne({ where: { email: input.email } });
    } catch (error) {
      console.log(error);
    }
    return { faculty };
  }
}
