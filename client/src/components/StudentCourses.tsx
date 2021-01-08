import {
  Box,
  Button,
  Flex,
  Grid,
  HStack,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { useStudentCoursesBySemesterQuery } from "../generated/graphql";
import { getSemesterName } from "../utils/getSemesterName";

interface Props {}

const StudentCourses = (props: Props) => {
  const [semesterNumber, setSemesterNumber] = useState<number>();
  const { data } = useStudentCoursesBySemesterQuery({
    variables: {
      input: semesterNumber,
    },
  });

  const { control } = useForm();

  const semNum = useWatch({
    control,
    name: "semester",
    defaultValue: "1",
  });

  useEffect(() => {
    setSemesterNumber(parseInt(semNum));
  }, [semNum]);

  return (
    <Box>
      <Flex justify="space-between" mb={6} mt={10}>
        <Text fontWeight="bold" fontSize="3xl">
          My Courses
        </Text>
        <Menu closeOnSelect={false}>
          <MenuButton as={Button} colorScheme="purple">
            Select Semester
          </MenuButton>
          <MenuList minWidth="115px">
            <Controller
              as={
                <MenuOptionGroup defaultValue="1" type="radio">
                  <MenuItemOption value="1">1st</MenuItemOption>
                  <MenuItemOption value="2">2nd</MenuItemOption>
                  <MenuItemOption value="3">3rd</MenuItemOption>
                  <MenuItemOption value="4">4th</MenuItemOption>
                  <MenuItemOption value="5">5th</MenuItemOption>
                  <MenuItemOption value="6">6th</MenuItemOption>
                  <MenuItemOption value="7">7th</MenuItemOption>
                  <MenuItemOption value="8">8th</MenuItemOption>
                </MenuOptionGroup>
              }
              control={control}
              name="semester"
              defaultValue="1"
            />
          </MenuList>
        </Menu>
      </Flex>
      <Grid
        templateColumns={["1fr ", "1fr 1fr ", "1fr 1fr 1fr", "1fr 1fr 1fr"]}
        gap={6}
      >
        {data?.studentCoursesBySemester?.map((c) => (
          <Link
            key={c.id}
            href={`/my-courses/${c.code}?sessionId=${1}&departmentCode=${
              c.department.departmentCode
            }&semesterId=${c.semester.id}`}
          >
            <Box p={4} bg="purple.50" borderRadius="xl" cursor="pointer">
              <Text
                fontSize="xl"
                fontWeight="500"
                textTransform="capitalize"
                borderBottom="1px solid"
                mb={2}
              >
                {c.name}
              </Text>
              <Text>{c.department.name}</Text>
              <HStack justify="space-between">
                <Text>{getSemesterName(c.semester.number)} semester</Text>
                {/* <Text>{c.session.name}</Text> */}
              </HStack>
            </Box>
          </Link>
        ))}
      </Grid>
    </Box>
  );
};

export default StudentCourses;
