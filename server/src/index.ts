import { ApolloServer } from "apollo-server-express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { config } from "dotenv";
import "dotenv-safe/config";
import express from "express";
import jwt from "jsonwebtoken";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { Admin } from "./entities/Admin";
import { ClassSchedule } from "./entities/ClassSchedule";
import { Course } from "./entities/Course";
import { CourseAssignToFaculty } from "./entities/CourseAssignToFaculty";
import { Department } from "./entities/Department";
import { Faculty } from "./entities/Faculty";
import { Notice } from "./entities/Notice";
import { Semester } from "./entities/Semester";
import { Session } from "./entities/Session";
import { Student } from "./entities/Student";
import { AdminResolver } from "./resolvers/Admin";
import { ClassScheduleResolver } from "./resolvers/ClassSchedule";
import { CourseResolver } from "./resolvers/Course";
import { CourseAssignToFacultyResolver } from "./resolvers/CourseAssignToFaculty";
import { DepartmentResolver } from "./resolvers/Department";
import { FacultyResolver } from "./resolvers/Faculty";
import { MeResolver } from "./resolvers/Me";
import { NoticeResolver } from "./resolvers/Notice";
import { SemesterResolver } from "./resolvers/Semester";
import { SessionResolver } from "./resolvers/Session";
import { StudentResolver } from "./resolvers/Student";
import { MyContext } from "./types/MyContext";

config();

const main = async () => {
  await createConnection({
    type: "postgres",
    host: "localhost",
    url: process.env.DATABASE_URL,
    synchronize: true,
    logging: true,
    entities: [
      Admin,
      ClassSchedule,
      Course,
      CourseAssignToFaculty,
      Department,
      Faculty,
      Semester,
      Session,
      Student,
      Notice,
    ],
  });

  const app = express();

  app.use(
    cors({
      origin: ["http://localhost:3000", "http://localhost:3001"],
      credentials: true,
    })
  );
  app.use(cookieParser());

  // ** middleware for getting the userId from cookies
  app.use((req, _, next) => {
    const token = req.cookies["token"];
    try {
      const response = jwt.verify(token, `${process.env.JWT_SECRET}`) as any;
      (req as any).adminId = response.adminId;
      (req as any).studentId = response.studentId;
      (req as any).facultyId = response.facultyId;
    } catch {}
    next();
  });

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [
        AdminResolver,
        ClassScheduleResolver,
        CourseResolver,
        CourseAssignToFacultyResolver,
        DepartmentResolver,
        FacultyResolver,
        MeResolver,
        SemesterResolver,
        SessionResolver,
        StudentResolver,
        NoticeResolver,
      ],
      validate: false,
    }),
    context: ({ req, res }): MyContext => ({
      req,
      res,
    }),
    playground: {
      settings: {
        "request.credentials": "include",
      },
    },
  });

  apolloServer.applyMiddleware({ app, cors: false });

  const port = process.env.PORT || 4000;

  app.listen(port, () => {
    console.log(`graphql server : http://localhost:${port}/graphql`);
  });
};

main();
