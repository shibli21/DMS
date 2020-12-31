import {
  Arg,
  Ctx,
  Field,
  Int,
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
import { Student } from "./../entities/Student";
import { isStudent } from "./../middleware/isStudent";
import { AddClassScheduleInputType } from "./../types/InputTypes/AddClassScheduleInputType";
import { MyContext } from "./../types/MyContext";

@ObjectType()
class AddClassScheduleResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Boolean, { nullable: true })
  classSchedule?: boolean;
}

@Resolver()
export class ClassScheduleResolver {
  @Query(() => [ClassSchedule])
  classSchedules(): Promise<ClassSchedule[]> {
    return ClassSchedule.find({
      relations: ["department", "session", "semester", "faculty", "course"],
    });
  }

  @Query(() => [ClassSchedule])
  async classScheduleByAll(
    @Arg("departmentCode") departmentCode: string,
    @Arg("courseCode") courseCode: string,
    @Arg("sessionId", () => Int) sessionId: number,
    @Arg("semesterId", () => Int) semesterId: number
  ): Promise<ClassSchedule[]> {
    return ClassSchedule.find({
      relations: ["department", "session", "semester", "faculty", "course"],
      order: {
        day: "ASC",
      },
      where: {
        department: await Department.findOne({
          where: {
            departmentCode: departmentCode,
          },
        }),
        course: await Course.findOne({
          where: {
            code: courseCode,
          },
        }),
        session: await Session.findOne({
          where: {
            id: sessionId,
          },
        }),
        semester: await Semester.findOne({
          where: {
            id: semesterId,
          },
        }),
      },
    });
  }

  @UseMiddleware(isAdmin)
  @Mutation(() => AddClassScheduleResponse)
  async addClassSchedule(
    @Arg("input") input: AddClassScheduleInputType
  ): Promise<AddClassScheduleResponse> {
    const errors = [];
    const department = await Department.findOne({
      where: { departmentCode: input.departmentCode },
    });

    if (!department) {
      errors.push({
        field: "departmentCode",
        message: "Department doesn't exists!",
      });
    }

    const course = await Course.findOne({
      where: {
        code: input.courseCode,
      },
    });

    if (!course) {
      errors.push({
        field: "courseCode",
        message: "Course doesn't exists!",
      });
    }

    const semester = await Semester.findOne({
      where: { department: department, id: input.semesterId },
      relations: ["department"],
    });

    if (!semester) {
      errors.push({
        field: "semester",
        message: "Semester doesn't exists!",
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

    const faculty = await Faculty.findOne({
      where: {
        id: input.facultyId,
      },
    });

    if (!faculty) {
      errors.push({
        field: "facultyId",
        message: "Faculty doesn't exists!",
      });
    }
    if (!input.classes) {
      errors.push({
        field: "classes",
        message: "No class",
      });
    }
    if (errors.length > 0) {
      return { errors };
    }

    let classSchedule;
    try {
      await getConnection()
        .createQueryBuilder()
        .insert()
        .into(ClassSchedule)
        .values(
          input.classes.map((cls, _) => ({
            department: department,
            semester: semester,
            course: course,
            session: session,
            faculty: faculty,
            day: cls.day,
            startTime: cls.startTime,
            endTime: cls.endTime,
          }))
        )
        .returning("*")
        .execute();
      classSchedule = true;
    } catch (error) {
      console.log(error);
    }

    return { classSchedule };
  }

  @UseMiddleware(isStudent)
  @Query(() => [ClassSchedule])
  async studentClassSchedule(
    @Ctx() { req }: MyContext
  ): Promise<ClassSchedule[]> {
    const student = await Student.findOneOrFail({
      where: {
        id: req.studentId,
      },
      relations: ["department", "session"],
    });

    const classSchedule = await getConnection()
      .getRepository(ClassSchedule)
      .createQueryBuilder("cs")
      .leftJoinAndSelect("cs.semester", "semester")
      .leftJoinAndSelect("cs.course", "course")
      .leftJoinAndSelect("cs.department", "department")
      .leftJoinAndSelect("cs.faculty", "faculty")
      .leftJoinAndSelect("cs.session", "session")
      .where(`"department"."departmentCode" = :code`, {
        code: student.department.departmentCode,
      })
      .andWhere(`"session"."id" =:id`, {
        id: student.session.id,
      })

      .getMany();

    return classSchedule;
  }

  @Query(() => [ClassSchedule])
  async todaysClassSchedule(
    @Ctx() { req }: MyContext
  ): Promise<ClassSchedule[]> {
    const student = await Student.findOneOrFail({
      where: {
        id: req.studentId,
      },
      relations: ["department", "session"],
    });

    const classSchedule = ClassSchedule.find({
      relations: ["department", "session", "semester", "faculty", "course"],
      order: {
        startTime: "ASC",
      },
      where: {
        department: await Department.findOne({
          where: {
            departmentCode: student.department.departmentCode,
          },
        }),
        session: await Session.findOne({
          where: {
            id: student.session.id,
          },
        }),
        day: 5,
      },
    });

    return classSchedule;
  }
}
