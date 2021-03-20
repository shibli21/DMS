import { Box, Divider, Grid, HStack, Text } from "@chakra-ui/react";
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
      <Text fontWeight="bold" fontSize="3xl" mb={6} mt={10} display="inline-block" color="white" bg="green.400" p={2}>
        My Courses
      </Text>
      <Grid templateColumns={["1fr ", "1fr 1fr ", "1fr 1fr 1fr", "1fr 1fr 1fr"]} gap={6}>
        {data?.courseAssignToFaculty?.map((c) => (
          <Link
            key={c.id}
            href={`/my-courses/${c.course.code}?sessionId=${c.session.id}&departmentCode=${c.department.departmentCode}&semesterId=${c.semester.id}&cname=${c.course.name}`}
          >
            <Box p={4} bg="green.50" cursor="pointer" border="2px solid" borderColor="green.100">
              <Text fontSize="xl" fontWeight="700" textTransform="capitalize" mb={2}>
                {c.course.name}
              </Text>
              <Divider bg="green.300" height="1px" mb={1} />

              <Text fontWeight="600">{c.department.name}</Text>
              <HStack justify="space-between" fontFamily="poppins">
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
