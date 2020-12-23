import {
  Arg,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
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
  @Query(() => [Session])
  sessions(): Promise<Session[]> {
    return Session.find();
  }

  @UseMiddleware(isAdmin)
  @Mutation(() => SessionResponse)
  async addSession(
    @Arg("input") input: AddSessionInputType
  ): Promise<SessionResponse> {
    const session = await Session.create({
      startTime: input.startTime,
      name: input.name,
      endTime: input.endTime ? input.endTime : undefined,
    }).save();

    return { session };
  }
}
