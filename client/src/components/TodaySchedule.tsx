import { Box, Flex, Grid, Text } from "@chakra-ui/react";
import React from "react";
import { useTodaysClassScheduleQuery } from "../generated/graphql";

interface Props {}

const TodaySchedule = (props: Props) => {
  const { data } = useTodaysClassScheduleQuery();

  if (!data) {
    return <Box>No class today</Box>;
  }

  return (
    <>
      <Text fontWeight="bold" fontSize="3xl" mb={6}>
        Today Schedule
      </Text>
      <Grid templateColumns="1fr 1fr 1fr 1fr 1fr" gap={6}>
        {data.todaysClassSchedule.map((ts) => (
          <Box
            bgGradient="linear(to bottom right,red.400,red.600)"
            w="250px"
            p={4}
            color="white"
            borderRadius="2xl"
          >
            <Flex mb={2} justify="space-between">
              <Text bg="red.500" borderRadius="5px" px={1}>
                Lect
              </Text>
              <Text>{ts.startTime.slice(0, 5)}</Text>
            </Flex>
            <Text fontSize="2xl" mb={2} lineHeight="1" fontWeight="500">
              {ts.course.name}
            </Text>
            <Text>
              {ts.faculty.designation} {ts.faculty.username}
            </Text>
          </Box>
        ))}
      </Grid>
    </>
  );
};

export default TodaySchedule;
