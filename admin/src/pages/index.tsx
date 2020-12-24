import { Box, Flex, Grid, Heading, Text } from "@chakra-ui/react";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";

export default function Home() {
  return (
    <Box mt={10}>
      <Grid templateColumns="1fr 1fr 1fr 1fr" gap={10}>
        <Link href="/add-session">
          <Flex
            align="center"
            justify="space-between"
            bg="teal.300"
            p={4}
            cursor="pointer"
          >
            <Text>Add Session</Text>
            <FaPlus />
          </Flex>
        </Link>
        <Link href="/add-semester">
          <Flex
            align="center"
            justify="space-between"
            bg="orange.300"
            p={4}
            cursor="pointer"
          >
            <Text>Add Semester</Text>
            <FaPlus />
          </Flex>
        </Link>
        <Link href="/add-department">
          <Flex
            align="center"
            justify="space-between"
            bg="purple.300"
            p={4}
            cursor="pointer"
          >
            <Text>Add Department</Text>
            <FaPlus />
          </Flex>
        </Link>
        <Link href="/add-course">
          <Flex
            align="center"
            justify="space-between"
            bg="pink.300"
            p={4}
            cursor="pointer"
          >
            <Text>Add Course</Text>
            <FaPlus />
          </Flex>
        </Link>
        <Link href="/add-student">
          <Flex
            align="center"
            justify="space-between"
            bg="green.300"
            p={4}
            cursor="pointer"
          >
            <Text>Add student</Text>
            <FaPlus />
          </Flex>
        </Link>
        <Link href="/add-faculty">
          <Flex
            align="center"
            justify="space-between"
            bg="yellow.300"
            p={4}
            cursor="pointer"
          >
            <Text>Add faculty</Text>
            <FaPlus />
          </Flex>
        </Link>
        <Link href="/assign-course-to-faculty">
          <Flex
            align="center"
            justify="space-between"
            bg="gray.300"
            p={4}
            cursor="pointer"
          >
            <Text>Assign course to faculty</Text>
            <FaPlus />
          </Flex>
        </Link>
      </Grid>
    </Box>
  );
}
