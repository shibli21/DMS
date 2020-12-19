import {
  Ctx,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import { Admin } from "./../entities/Admin";
import { Student } from "./../entities/Student";
import { MyContext } from "./../types/MyContext";

@ObjectType()
class MeResponse {
  @Field(() => Student, { nullable: true })
  student?: Student;

  @Field(() => Admin, { nullable: true })
  admin?: Admin;
}

@Resolver()
export class MeResolver {
  @Query(() => MeResponse, { nullable: true })
  async me(@Ctx() { req }: MyContext): Promise<MeResponse | null> {
    if (req.studentId) {
      return { student: await Student.findOne(req.adminId) };
    } else if (req.adminId) {
      return { admin: await Admin.findOne(req.adminId) };
    } else {
      return null;
    }
  }

  @Mutation(() => Boolean)
  logout(@Ctx() { res }: MyContext) {
    res.clearCookie("token");
    return true;
  }
}
