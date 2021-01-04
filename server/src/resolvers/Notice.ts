import {
  Arg,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { Course } from "./../entities/Course";
import { Department } from "./../entities/Department";
import { Notice } from "./../entities/Notice";
import { Semester } from "./../entities/Semester";
import { Session } from "./../entities/Session";
import { isFaculty } from "../middleware/isFaculty";
import { AddNoticeInputType } from "./../types/InputTypes/AddNoticeInputType";
import { FieldError } from "./../types/ObjectTypes/FieldErrorType";

@ObjectType()
class NoticeResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Notice, { nullable: true })
  notice?: Notice;
}

@Resolver()
export class NoticeResolver {
  @Query(() => [Notice])
  notices(): Promise<Notice[]> {
    return Notice.find({
      relations: ["department", "session", "semester", "course"],
    });
  }

  @Query(() => [Notice])
  async courseNotice(
    @Arg("input") input: AddNoticeInputType
  ): Promise<Notice[]> {
    return Notice.find({
      relations: ["department", "session", "semester", "course"],
      where: {
        department: await Department.findOne({
          where: {
            departmentCode: input.departmentCode,
          },
        }),
        course: await Course.findOne({
          where: {
            code: input.courseCode,
          },
        }),
        semester: await Semester.findOne({
          where: {
            id: input.semesterId,
          },
        }),
        session: await Session.findOne({
          where: {
            id: input.sessionId,
          },
        }),
      },
    });
  }

  @UseMiddleware(isFaculty)
  @Mutation(() => NoticeResponse)
  async publishNotice(
    @Arg("input") input: AddNoticeInputType
  ): Promise<NoticeResponse> {
    let errors = [];

    const department = await Department.findOne({
      where: { departmentCode: input.departmentCode },
    });
    if (!department) {
      errors.push({
        field: "departmentCode",
        message: "Department doesn't exists!",
      });
    }

    const semester = await Semester.findOne(input.semesterId);
    if (!semester) {
      errors.push({
        field: "semesterId",
        message: "Semester doesn't exists!",
      });
    }
    const course = await Course.findOne({ where: { code: input.courseCode } });
    if (!course) {
      errors.push({
        field: "courseCode",
        message: "Course doesn't exists!",
      });
    }

    const session = await Session.findOne(input.sessionId);

    if (!session) {
      errors.push({
        field: "sessionId",
        message: "Session doesn't exists!",
      });
    }

    if (errors.length > 0) {
      return { errors };
    }
    const notice = await Notice.create({
      title: input.title,
      description: input.description,
      department: department,
      session: session,
      semester: semester,
      course: course,
    }).save();

    return { notice };
  }
}
