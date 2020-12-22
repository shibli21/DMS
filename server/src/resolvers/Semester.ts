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
import { Department } from "./../entities/Department";
import { Semester } from "./../entities/Semester";
import { Session } from "./../entities/Session";
import { AddSemesterInputType } from "./../types/InputTypes/AddSemesterInputType";

@ObjectType()
class SemesterResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Semester, { nullable: true })
  semester?: Semester;
}

@Resolver()
export class SemesterResolver {
  @Query(() => [Semester])
  semesters(): Promise<Semester[]> {
    return Semester.find();
  }

  @UseMiddleware(isAdmin)
  @Mutation(() => SemesterResponse)
  async addSemester(
    @Arg("input") input: AddSemesterInputType
  ): Promise<SemesterResponse> {
    const department = await Department.findOne({
      where: { departmentCode: input.departmentCode },
    });

    if (!department) {
      return {
        errors: [
          {
            field: "departmentCode",
            message: "Department doesn't exists!",
          },
        ],
      };
    }

    const session = await Session.findOne({
      where: { id: input.sessionId },
    });

    if (!session) {
      return {
        errors: [
          {
            field: "session",
            message: "Session doesn't exists!",
          },
        ],
      };
    }
    const semester = await Semester.create({
      number: input.number,
      department: department,
      session: session,
      startTime: input.startTime,
    }).save();

    return { semester };
  }
}
