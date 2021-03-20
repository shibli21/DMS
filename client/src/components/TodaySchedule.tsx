import { Box, Divider, Flex, Grid, HStack, Text } from "@chakra-ui/react";
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
          Today Class
        </Text>
        <Box
          fontWeight="bold"
          fontSize="xl"
          bgGradient="linear(to bottom right,red.400,red.300)"
          p={4}
          color="white"
          maxW="400px"
        >
          No class today
        </Box>
      </>
    );
  }

  return (
    <>
      <HStack align="center" mb={6}>
        <Text fontWeight="bold" fontSize="2xl">
          Today Classes
        </Text>
        <Text fontWeight="300" fontFamily="poppins" color="gray.500">
          ( {data?.todaysClassSchedule?.length} )
        </Text>
      </HStack>
      <Grid templateColumns={["1fr ", "1fr 1fr", "1fr 1fr 1fr", "1fr 1fr 1fr 1fr"]} gap={6}>
        {data?.todaysClassSchedule?.map((ts) => (
          <Box p={4} bg="cyan.50" cursor="pointer" border="2px solid" borderColor="cyan.100" key={ts.id}>
            <Flex mb={2} justify="space-between">
              <Text bg="cyan.600" borderRadius="5px" px={1} color="white">
                Lect
              </Text>
              <Text fontFamily="poppins">{DateTime.fromISO(ts.startTime).toLocaleString(DateTime.TIME_SIMPLE)}</Text>
            </Flex>
            <Divider height="2px" bg="cyan.200" mb={2} />
            <Text fontSize="2xl" mb={2} lineHeight="1" textTransform="capitalize" fontWeight="600">
              {ts.course.name}
            </Text>
            <Text fontFamily="poppins">
              {ts.faculty.designation} {ts.faculty.username}
            </Text>
          </Box>
        ))}
      </Grid>
    </>
  );
};

export default TodaySchedule;
