import { StudentResolver } from "./resolvers/Student";
import { SessionResolver } from "./resolvers/Session";
import { SemesterResolver } from "./resolvers/Semester";
import { MeResolver } from "./resolvers/Me";
import { FacultyResolver } from "./resolvers/Faculty";
import { DepartmentResolver } from "./resolvers/Department";
import { CourseAssignToFacultyResolver } from "./resolvers/CourseAssignToFaculty";
import { CourseResolver } from "./resolvers/Course";
import { ClassScheduleResolver } from "./resolvers/ClassSchedule";
import { AdminResolver } from "./resolvers/Admin";
import { Student } from "./entities/Student";
import { Session } from "./entities/Session";
import { Semester } from "./entities/Semester";
import { Faculty } from "./entities/Faculty";
import { Department } from "./entities/Department";
import { CourseAssignToFaculty } from "./entities/CourseAssignToFaculty";
import { Course } from "./entities/Course";
import { ClassSchedule } from "./entities/ClassSchedule";
import { Admin } from "./entities/Admin";
import { ApolloServer } from "apollo-server-express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { config } from "dotenv";
import express from "express";
import jwt from "jsonwebtoken";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { MyContext } from "./types/MyContext";

config();

const main = async () => {
  await createConnection({
    type: "postgres",
    host: "localhost",
    port: 5432,
    password: "root",
    username: "postgres",
    database: "dms",
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
