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
} from "type-graphql";
import { getConnection } from "typeorm";
import { RegisterAdminInputType } from "../types/InputTypes/RegisterAdminInputType";
import { validateAdminRegister } from "../utils/validateAdminRegister";
import { Admin } from "../entities/Admin";
import { MyContext } from "../types/MyContext";
import { FieldError } from "../types/ObjectTypes/FieldErrorType";

@ObjectType()
class AdminResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Admin, { nullable: true })
  admin?: Admin;
}

@Resolver()
export class AdminResolver {
  @Query(() => String)
  hello() {
    return "world";
  }

  @Mutation(() => AdminResponse)
  async registerAdmin(
    @Arg("input") input: RegisterAdminInputType,
    @Ctx() { res }: MyContext
  ): Promise<AdminResponse> {
    const errors = validateAdminRegister(input);
    if (errors) {
      return { errors };
    }

    const hashedPassword = await hash(input.password);
    const emailToLower = input.email.toLowerCase();

    let admin;
    try {
      await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Admin)
        .values({
          username: input.username,
          email: emailToLower,
          password: hashedPassword,
        })
        .execute();

      admin = await Admin.findOne({ where: { email: input.email } });

      const token = jwt.sign(
        { adminId: admin?.id },
        `${process.env.JWT_SECRET}`
      );
      res.cookie("token", token, {
        httpOnly: true,
        maxAge: 100000000,
      });
    } catch (error) {
      if (error.code === "23505") {
        return {
          errors: [
            {
              field: "email",
              message: "already exists ",
            },
          ],
        };
      }
    }
    return { admin };
  }

  @Mutation(() => AdminResponse)
  async adminLogin(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() { res }: MyContext
  ): Promise<AdminResponse> {
    const admin = await Admin.findOne({ email: email });
    if (!admin) {
      return { errors: [{ field: "email", message: "admin doesn't exists" }] };
    }

    const valid = await verify(admin.password, password);

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
    const token = jwt.sign({ adminId: admin.id }, `${process.env.JWT_SECRET}`);
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 100000000000,
    });

    return { admin };
  }
}
