import { Box, Grid, HStack, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { useCourseAssignToFacultyQuery } from "../generated/graphql";
import { getSemesterName } from "../utils/getSemesterName";
import LoadingSpinner from "./LoadingSpinner";
interface Props {}

const CoursesAssignToFaculty = (props: Props) => {
  const { data, loading } = useCourseAssignToFacultyQuery();
  if (loading) {
    return (
      <Box>
        <LoadingSpinner />
      </Box>
    );
  }
  return (
    <>
      <Text fontWeight="bold" fontSize="3xl" mb={6} mt={10}>
        My Courses
      </Text>
      <Grid
        templateColumns={["1fr ", "1fr 1fr ", "1fr 1fr 1fr", "1fr 1fr 1fr"]}
        gap={6}
      >
        {data?.courseAssignToFaculty?.map((c) => (
          <Link
            key={c.id}
            href={`/my-courses/${c.course.code}?sessionId=${c.session.id}&departmentCode=${c.department.departmentCode}&semesterId=${c.semester.id}`}
          >
            <Box p={4} bg="purple.50" borderRadius="xl" cursor="pointer">
              <Text
                fontSize="xl"
                fontWeight="500"
                textTransform="capitalize"
                borderBottom="1px solid"
                mb={2}
              >
                {c.course.name}
              </Text>
              <Text>{c.department.name}</Text>
              <HStack justify="space-between">
                <Text>{getSemesterName(c.semester.number)} semester</Text>
                <Text>{c.session.name}</Text>
              </HStack>
            </Box>
          </Link>
        ))}
      </Grid>
    </>
  );
};

export default CoursesAssignToFaculty;
