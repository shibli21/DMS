import { Arg, Field, Int, Mutation, ObjectType, Query, Resolver, UseMiddleware } from "type-graphql";
import { isAdmin } from "../middleware/isAdmin";
import { FieldError } from "../types/ObjectTypes/FieldErrorType";
import { Session } from "./../entities/Session";
import { AddSessionInputType } from "./../types/InputTypes/AddSessionInputType";

@ObjectType()
class SessionResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Session, { nullable: true })
  session?: Session;
}

@Resolver()
export class SessionResolver {
  @Query(() => Session)
  session(@Arg("sessionId", () => Int) sessionId: number): Promise<Session> {
    return Session.findOneOrFail({
      where: {
        id: sessionId,
      },
      relations: ["semester", "semester.department"],
    });
  }

  @Query(() => [Session])
  sessions(): Promise<Session[]> {
    return Session.find({
      order: {
        id: "DESC",
      },
    });
  }

  @UseMiddleware(isAdmin)
  @Mutation(() => SessionResponse)
  async addSession(@Arg("input") input: AddSessionInputType): Promise<SessionResponse> {
    let errors = [];
    if (!input.startTime) {
      errors.push({
        field: "startTime",
        message: "Start time can't be empty",
      });
    }
    if (!input.endTime) {
      errors.push({
        field: "endTime",
        message: "End time time can't be empty",
      });
    }
    if (!input.name) {
      errors.push({
        field: "name",
        message: "Name can't be empty",
      });
    }
    if (errors.length > 0) {
      return { errors };
    }
    const session = await Session.create({
      startTime: input.startTime,
      name: input.name,
      endTime: input.endTime ? input.endTime : undefined,
    }).save();

    return { session };
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAdmin)
  async deleteSession(@Arg("id", () => Int) id: number): Promise<boolean> {
    await Session.delete({
      id: id,
    });

    return true;
  }
}
