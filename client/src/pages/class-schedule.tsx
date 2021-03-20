import { Box, Container, Grid, HStack, Text } from "@chakra-ui/react";
import { DateTime } from "luxon";
import Head from "next/head";
import React from "react";
import TodaySchedule from "../components/TodaySchedule";
import { useStudentOrFacultyClassScheduleQuery } from "../generated/graphql";
import { getDayName } from "../utils/getDayName";
import { getSemesterName } from "../utils/getSemesterName";

interface Props {}

const ClassSchedule = (props: Props) => {
  const { data } = useStudentOrFacultyClassScheduleQuery();

  if (!data) {
    return <Box>No Schedule</Box>;
  }

  const groupBySemester = (array: any[], key: string) => {
    return array.reduce((result, currentValue) => {
      (result[currentValue.semester[key]] = result[currentValue.semester[key]] || []).push(currentValue);
      return result;
    }, {});
  };

  const groupBy = (array: any[], key: string) => {
    return array.reduce((result, currentValue) => {
      (result[currentValue[key]] = result[currentValue[key]] || []).push(currentValue);
      return result;
    }, {});
  };

  const gbyS = groupBySemester(data.studentOrFacultyClassSchedule, "number");

  return (
    <>
      <Head>
        <title>Class schedule</title>
      </Head>

      <Container>
        <Text textAlign="center" fontWeight="bold" fontSize="3xl" bg="cyan.700" p={2} mb={10} color="white">
          Class Routine
        </Text>
      </Container>
      <TodaySchedule />
      <Box mt={5}>
        {Object.entries(gbyS).map(([key, value]) => (
          <Box mb={10}>
            <Text fontWeight="500" fontSize="lg" fontFamily="poppins" flex="1" textAlign="left" mb={4}>
              {getSemesterName(parseInt(key))} Semester
            </Text>
            <Box>
              {Object.entries(groupBy(gbyS[key], "day")).map(([key, value]: any) => (
                <Box>
                  <Box fontWeight="500" fontSize="lg" mb={2} textTransform="capitalize">
                    {getDayName(key)}
                  </Box>
                  <Grid templateColumns="1fr 1fr 1fr">
                    {value.map((v) => (
                      <HStack
                        key={v.id}
                        align="flex-start"
                        mb={2}
                        bg="cyan.50"
                        border="2px solid"
                        borderColor="cyan.700"
                      >
                        <Box color="white" w="85px" p={2} bgGradient="linear(to bottom right,cyan.700,cyan.800)">
                          <Box fontFamily="poppins">
                            {DateTime.fromISO(v.startTime).toLocaleString(DateTime.TIME_SIMPLE)}
                          </Box>
                          <Box fontFamily="poppins">
                            {DateTime.fromISO(v.endTime).toLocaleString(DateTime.TIME_SIMPLE)}
                          </Box>
                        </Box>
                        <Box p={2}>
                          <Box fontWeight="700" textTransform="capitalize">
                            {v.course.name}
                          </Box>
                          <HStack fontWeight="500">
                            <Text>{v.faculty.designation}</Text>
                            <Text>{v.faculty.username}</Text>
                          </HStack>
                        </Box>
                      </HStack>
                    ))}
                  </Grid>
                </Box>
              ))}
            </Box>
          </Box>
        ))}
      </Box>
    </>
  );
};

export default ClassSchedule;
