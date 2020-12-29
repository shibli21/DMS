import {
  Arg,
  Field,
  Int,
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
    return Semester.find({
      order: {
        session: "DESC",
      },
      relations: ["department", "session"],
    });
  }

  @Query(() => [Semester])
  async semestersByDepartmentAndSession(
    @Arg("code") code: string,
    @Arg("sessionId", () => Int) sessionId: number
  ): Promise<Semester[]> {
    return Semester.find({
      where: {
        department: await Department.findOne({
          where: {
            departmentCode: code,
          },
        }),
        session: await Session.findOne(sessionId),
      },
      relations: ["department", "session"],
    });
  }

  @UseMiddleware(isAdmin)
  @Mutation(() => SemesterResponse)
  async addSemester(
    @Arg("input") input: AddSemesterInputType
  ): Promise<SemesterResponse> {
    let errors = [];
    if (!input.number) {
      errors.push({
        field: "number",
        message: "Number can't be empty!",
      });
    }
    if (!input.startTime) {
      errors.push({
        field: "startTime",
        message: "Start time can't be empty!",
      });
    }
    if (!input.endTime) {
      errors.push({
        field: "endTime",
        message: "End time can't be empty!",
      });
    }
    const department = await Department.findOne({
      where: { departmentCode: input.departmentCode },
    });
    if (!department) {
      errors.push({
        field: "departmentCode",
        message: "Department doesn't exists!",
      });
    }

    if (input.number > 9 || input.number === 0) {
      errors.push({
        field: "number",
        message: "Semester number invalid",
      });
    }
    const session = await Session.findOne({
      where: { id: input.sessionId },
    });

    if (!session) {
      errors.push({
        field: "sessionId",
        message: "Session doesn't exists!",
      });
    }

    const semesterExists = await Semester.findOne({
      where: {
        department: department,
        number: input.number,
      },
    });

    if (semesterExists) {
      errors.push({
        field: "semesterExists",
        message: "Semester already exists!",
      });
    }

    if (errors.length > 0) {
      return { errors };
    }
    const semester = await Semester.create({
      number: input.number,
      department: department,
      session: session,
      startTime: input.startTime,
      endTime: input.endTime ? input.endTime : undefined,
    }).save();

    return { semester };
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAdmin)
  async deleteSemester(@Arg("id", () => Int) id: number): Promise<boolean> {
    await Semester.delete({
      id: id,
    });
    return true;
  }
}
