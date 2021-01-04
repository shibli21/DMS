import { Box, HStack, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { useCourseAssignToFacultyQuery } from "../generated/graphql";
import { getSemesterName } from "../utils/getSemesterName";
interface Props {}

const CoursesAssignToFaculty = (props: Props) => {
  const { data, loading } = useCourseAssignToFacultyQuery();
  if (loading) {
    <Box>loading...</Box>;
  }
  return (
    <>
      <Text fontWeight="bold" fontSize="3xl" mb={6} mt={10}>
        My Courses
      </Text>
      <Box>
        {data?.courseAssignToFaculty?.map((c) => (
          <Link
            href={`/my-courses/${c.course.code}?sessionId=${c.session.id}&departmentCode=${c.department.departmentCode}&semesterId=${c.semester.id}`}
          >
            <Box
              w="450px"
              p={4}
              bg="red.50"
              my={2}
              borderRadius="xl"
              cursor="pointer"
            >
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
      </Box>
    </>
  );
};

export default CoursesAssignToFaculty;
