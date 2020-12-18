import { Admin } from "./../entities/Admin";
import { Ctx, Mutation, Query, Resolver } from "type-graphql";
import { MyContext } from "./../types/MyContext";

@Resolver()
export class MeResolver {
  @Query(() => Admin, { nullable: true })
  async me(@Ctx() { req }: MyContext) {
    console.log(process.env.JWT_SECRET);

    if (req.adminId) {
      return Admin.findOne(req.adminId);
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
