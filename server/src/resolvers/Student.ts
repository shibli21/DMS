import { Department } from "./../entities/Department";
import { Session } from "./../entities/Session";
import { hash, verify } from "argon2";
import jwt from "jsonwebtoken";
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
import { Student } from "../entities/Student";
import { isAdmin } from "../middleware/isAdmin";
import { AddStudentInputType } from "../types/InputTypes/AddStudentInputType";
import { FieldError } from "../types/ObjectTypes/FieldErrorType";
import { generateRandomString } from "../utils/generateRandomString";
import { validateAddStudent } from "../utils/validateAddStudent";
import { RegisterStudentInputType } from "./../types/InputTypes/RegisterStudentInputType";
import { MyContext } from "./../types/MyContext";

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
    return Student.find({ relations: ["session", "department"] });
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
          address: input.address,
          session: await Session.findOne({
            where: {
              id: input.sessionId,
            },
          }),
          department: await Department.findOne({
            where: {
              departmentCode: input.departmentCode,
            },
          }),
          gender: input.gender,
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

  @Mutation(() => StudentResponse)
  async registerStudent(
    @Arg("input") input: RegisterStudentInputType,
    @Ctx() { res }: MyContext
  ): Promise<StudentResponse> {
    const studentExists = await Student.findOne({
      where: {
        oneTimePassword: input.token,
        email: input.email,
      },
    });

    if (!studentExists) {
      return {
        errors: [
          {
            field: "token",
            message: "Invalid token",
          },
        ],
      };
    }

    if (input.password.length < 6) {
      return {
        errors: [
          {
            field: "password",
            message: "Password can't be less than 6",
          },
        ],
      };
    }
    const hashedPassword = await hash(input.password);

    let student;
    try {
      await getConnection()
        .createQueryBuilder()
        .update(Student)
        .set({
          password: hashedPassword,
          oneTimePassword: undefined,
        })
        .where("id = :id", { id: studentExists.id })
        .execute();

      student = await Student.findOne({
        where: { email: input.email },
        relations: ["session", "department"],
      });

      const token = jwt.sign(
        { studentId: student?.id },
        `${process.env.JWT_SECRET}`
      );
      res.cookie("token", token, {
        httpOnly: true,
        maxAge: 100000000,
      });
    } catch (error) {}
    return { student };
  }
  @Mutation(() => StudentResponse)
  async studentLogin(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() { res }: MyContext
  ): Promise<StudentResponse> {
    const student = await Student.findOne({ email: email });
    if (!student) {
      return {
        errors: [{ field: "email", message: "student doesn't exists" }],
      };
    }

    const valid = await verify(student.password, password);

    if (!valid) {
      return {
        errors: [
          {
            field: "password",
            message: "Password incorrect",
          },
        ],
      };
    }
    const token = jwt.sign(
      { studentId: student.id },
      `${process.env.JWT_SECRET}`
    );
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 100000000000,
    });

    return { student };
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAdmin)
  async deleteStudent(@Arg("id", () => Int) id: number): Promise<boolean> {
    await Student.delete({
      id: id,
    });

    return true;
  }
}
