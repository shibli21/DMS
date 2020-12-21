import { hash, verify } from "argon2";
import jwt from "jsonwebtoken";
import {
  Arg,
  Ctx,
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
import { RegisterFacultyInputType } from "./../types/InputTypes/RegisterFacultyInputType";
import { MyContext } from "./../types/MyContext";

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

  @Mutation(() => FacultyResponse)
  async registerFaculty(
    @Arg("input") input: RegisterFacultyInputType,
    @Ctx() { res }: MyContext
  ): Promise<FacultyResponse> {
    const facultyExists = await Faculty.findOne({
      where: {
        oneTimePassword: input.token,
        email: input.email,
      },
    });

    if (!facultyExists) {
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

    let faculty;
    try {
      await getConnection()
        .createQueryBuilder()
        .update(Faculty)
        .set({
          password: hashedPassword,
          oneTimePassword: undefined,
        })
        .where("id = :id", { id: facultyExists.id })
        .execute();

      faculty = await Faculty.findOne({ where: { email: input.email } });

      const token = jwt.sign(
        { facultyId: faculty?.id },
        `${process.env.JWT_SECRET}`
      );
      res.cookie("token", token, {
        httpOnly: true,
        maxAge: 100000000,
      });
    } catch (error) {}
    return { faculty };
  }
  @Mutation(() => FacultyResponse)
  async facultyLogin(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() { res }: MyContext
  ): Promise<FacultyResponse> {
    const faculty = await Faculty.findOne({ email: email });
    if (!faculty) {
      return {
        errors: [{ field: "email", message: "student doesn't exists" }],
      };
    }

    const valid = await verify(faculty.password, password);

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
      { facultyId: faculty.id },
      `${process.env.JWT_SECRET}`
    );
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 100000000000,
    });

    return { faculty };
  }
}
