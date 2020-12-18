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
import { Student } from "../entities/Student";
import { isAdmin } from "../middleware/isAdmin";
import { AddStudentInputType } from "../types/InputTypes/AddStudentInputType";
import { FieldError } from "../types/ObjectTypes/FieldErrorType";
import { generateRandomString } from "../utils/generateRandomString";
import { validateAddStudent } from "../utils/validateAddStudent";

@ObjectType()
class StudentResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Student, { nullable: true })
  student?: Student;
}

@Resolver()
export class StudentResolver {
  @Query(() => [Student])
  students(): Promise<Student[]> {
    return Student.find();
  }

  @UseMiddleware(isAdmin)
  @Mutation(() => StudentResponse)
  async addStudent(
    @Arg("input") input: AddStudentInputType
  ): Promise<StudentResponse> {
    const errors = await validateAddStudent(input);
    if (errors) {
      return { errors };
    }

    const emailToLower = input.email.toLowerCase();

    let student;
    try {
      await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Student)
        .values({
          username: input.username,
          email: emailToLower,
          address: input.username,
          session: input.session,
          gender: input.username,
          registrationNumber: input.registrationNumber,
          contactNumber: input.contactNumber,
          oneTimePassword: generateRandomString(7),
        })
        .execute();

      student = await Student.findOne({ where: { email: input.email } });
    } catch (error) {
      console.log(error);
    }
    return { student };
  }
}
