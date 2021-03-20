import { MyContext } from "./../types/MyContext";
import { Arg, Ctx, Field, Mutation, ObjectType, Query, Resolver, UseMiddleware } from "type-graphql";
import { isFaculty } from "../middleware/isFaculty";
import { Course } from "./../entities/Course";
import { Department } from "./../entities/Department";
import { Notice } from "./../entities/Notice";
import { Semester } from "./../entities/Semester";
import { Session } from "./../entities/Session";
import { AddNoticeInputType } from "./../types/InputTypes/AddNoticeInputType";
import { CourseNoticeInputType } from "./../types/InputTypes/CourseNoticeInputType";
import { FieldError } from "./../types/ObjectTypes/FieldErrorType";
import { Student } from "../entities/Student";

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
  async myNotices(@Ctx() { req }: MyContext): Promise<Notice[]> {
    if (req.studentId) {
      const student = await Student.findOne({
        where: {
          id: req.studentId,
        },
        relations: ["department", "session"],
      });

      const notice = Notice.find({
        where: {
          department: await Department.findOne({
            where: {
              departmentCode: student?.department.departmentCode,
            },
          }),
          session: await Session.findOne({
            where: {
              id: student?.session.id,
            },
          }),
        },
        relations: ["department", "session", "semester", "course"],
        order: {
          createdAt: "DESC",
        },
      });
      return notice;
    } else return [];
  }

  @Query(() => [Notice])
  async courseNotice(@Arg("input") input: CourseNoticeInputType): Promise<Notice[]> {
    return Notice.find({
      relations: ["department", "session", "semester", "course"],
      order: {
        createdAt: "DESC",
      },
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
  async publishNotice(@Arg("input") input: AddNoticeInputType): Promise<NoticeResponse> {
    let errors = [];

    if (!input.title) {
      errors.push({
        field: "title",
        message: "Title can't be empty",
      });
    }

    if (!input.description) {
      errors.push({
        field: "description",
        message: "Description can't be empty",
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
