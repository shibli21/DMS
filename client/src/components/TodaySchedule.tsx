import { Box, Flex, Grid, HStack, Text } from "@chakra-ui/react";
import { DateTime } from "luxon";
import Link from "next/link";
import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { useTodaysClassScheduleQuery } from "../generated/graphql";
import LoadingSpinner from "./LoadingSpinner";

interface Props {}

const TodaySchedule = (props: Props) => {
  const { data, loading } = useTodaysClassScheduleQuery();

  if (loading) {
    return (
      <Box>
        <LoadingSpinner />
      </Box>
    );
  }
  if (data?.todaysClassSchedule?.length === 0) {
    return (
      <>
        <Text fontWeight="bold" fontSize="3xl" mb={6}>
          Today Schedule
        </Text>
        <Box
          bgGradient="linear(to bottom right,purple.400,purple.600)"
          p={4}
          color="white"
          borderRadius="2xl"
          maxW="400px"
        >
          No class today
        </Box>
      </>
    );
  }

  return (
    <>
      <Text fontWeight="bold" fontSize="3xl" mb={6}>
        Today Schedule
      </Text>
      <Grid
        templateColumns={["1fr ", "1fr 1fr", "1fr 1fr 1fr", "1fr 1fr 1fr 1fr"]}
        gap={6}
      >
        {data.todaysClassSchedule.map((ts) => (
          <Box
            key={ts.id}
            bgGradient="linear(to bottom right,purple.400,purple.600)"
            p={4}
            color="white"
            borderRadius="2xl"
          >
            <Flex mb={2} justify="space-between">
              <Text bg="purple.500" borderRadius="5px" px={1}>
                Lect
              </Text>
              <Text fontFamily="poppins">
                {DateTime.fromISO(ts.startTime).toLocaleString(
                  DateTime.TIME_SIMPLE
                )}
              </Text>
            </Flex>
            <Text
              fontSize="2xl"
              mb={2}
              lineHeight="1"
              textTransform="capitalize"
              fontWeight="500"
            >
              {ts.course.name}
            </Text>
            <Text>
              {ts.faculty.designation} {ts.faculty.username}
            </Text>
          </Box>
        ))}
      </Grid>
      <Link href="/class-schedule">
        <HStack mt={6} cursor="pointer" _hover={{ color: "purple.400" }}>
          <Text fontSize="lg">View all</Text>
          <FaArrowRight />
        </HStack>
      </Link>
    </>
  );
};

export default TodaySchedule;
