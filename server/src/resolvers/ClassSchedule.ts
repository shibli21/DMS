import {
  Arg,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { getConnection } from "typeorm";
import { isAdmin } from "../middleware/isAdmin";
import { FieldError } from "../types/ObjectTypes/FieldErrorType";
import { ClassSchedule } from "./../entities/ClassSchedule";
import { Course } from "./../entities/Course";
import { Department } from "./../entities/Department";
import { Faculty } from "./../entities/Faculty";
import { Semester } from "./../entities/Semester";
import { Session } from "./../entities/Session";
import { AddClassScheduleInputType } from "./../types/InputTypes/AddClassScheduleInputType";

@ObjectType()
class ClassScheduleResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => ClassSchedule, { nullable: true })
  classSchedule?: ClassSchedule;
}

@Resolver()
export class ClassScheduleResolver {
  @Query(() => [ClassSchedule])
  classSchedules(): Promise<ClassSchedule[]> {
    return ClassSchedule.find();
  }

  @UseMiddleware(isAdmin)
  @Mutation(() => ClassScheduleResponse)
  async addClassSchedule(
    @Arg("input") input: AddClassScheduleInputType
  ): Promise<ClassScheduleResponse> {
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

    const course = await Course.findOne({
      where: {
        code: input.courseCode,
      },
    });

    if (!course) {
      return {
        errors: [
          {
            field: "courseCode",
            message: "Course doesn't exists!",
          },
        ],
      };
    }

    const semester = await Semester.findOne({
      where: { department: department, id: input.semesterId },
      relations: ["department"],
    });

    if (!semester) {
      return {
        errors: [
          {
            field: "semester",
            message: "Semester doesn't exists!",
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

    const faculty = await Faculty.findOne({
      where: {
        id: input.facultyId,
      },
    });

    if (!faculty) {
      return {
        errors: [
          {
            field: "faculty",
            message: "Faculty doesn't exists!",
          },
        ],
      };
    }
    let classSchedule;
    try {
      const c = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(ClassSchedule)
        .values({
          department: department,
          semester: semester,
          course: course,
          session: session,
          day: input.day,
          startTime: input.startTime,
          endTime: input.endTime,
          faculty: faculty,
        })
        .execute();

      classSchedule = await ClassSchedule.findOne({
        where: { id: c.raw[0].id },
      });
    } catch (error) {
      if (error.code === "23505") {
        return {
          errors: [
            {
              field: "code",
              message: "ClassSchedule code already exists!",
            },
          ],
        };
      }
    }
    return { classSchedule };
  }
}
