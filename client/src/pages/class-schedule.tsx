import { Box, HStack, Text } from "@chakra-ui/react";
import React from "react";
import { useStudentClassScheduleQuery } from "../generated/graphql";
import { getDayName } from "../utils/getDayName";
import { getSemesterName } from "../utils/getSemesterName";

interface Props {}

const ClassSchedule = (props: Props) => {
  const { data } = useStudentClassScheduleQuery();

  if (!data) {
    return <Box>No Schedule</Box>;
  }

  const groupBySemester = (array, key) => {
    return array.reduce((result, currentValue) => {
      (result[currentValue.semester[key]] =
        result[currentValue.semester[key]] || []).push(currentValue);
      return result;
    }, {});
  };

  const groupBy = (array, key) => {
    return array.reduce((result, currentValue) => {
      (result[currentValue[key]] = result[currentValue[key]] || []).push(
        currentValue
      );
      return result;
    }, {});
  };

  const gbyS = groupBySemester(data.studentClassSchedule, "number");

  return (
    <>
      <Text textAlign="center" fontSize="4xl" mb={10}>
        Class schedule
      </Text>
      <Box>
        {Object.entries(gbyS).map(([key, value]) => (
          <>
            <Box
              fontWeight="500"
              fontSize="lg"
              mb={2}
              fontFamily="poppins"
              flex="1"
              textAlign="left"
            >
              {getSemesterName(parseInt(key))}
            </Box>
            <Box>
              {Object.entries(groupBy(gbyS[key], "day")).map(
                ([key, value]: any) => (
                  <Box>
                    <Box fontWeight="500" fontSize="lg" mb={2}>
                      {getDayName(key)}
                    </Box>
                    {value.map((v) => (
                      <HStack align="flex-start" p={2} mb={2} bg="gray.50">
                        <Box color="gray.700">
                          <Box>{v.startTime.slice(0, 5)}</Box>
                          <Box>{v.endTime.slice(0, 5)}</Box>
                        </Box>
                        <Box>
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
                  </Box>
                )
              )}
            </Box>
          </>
        ))}
      </Box>
    </>
  );
};

export default ClassSchedule;
