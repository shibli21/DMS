import { Box, Flex, Text } from "@chakra-ui/react";
import Head from "next/head";
import CoursesAssignToFaculty from "../components/CoursesAssignToFaculty";
import TodaySchedule from "../components/TodaySchedule";
import { CourseAssignToFacultyDocument } from "../generated/graphql";

export default function Home() {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <TodaySchedule />
      <CoursesAssignToFaculty />
    </>
  );
}
