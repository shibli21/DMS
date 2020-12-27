import { Box, Grid, GridItem, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";
import { SideBarItem } from "../components/SideBarItem";

export default function Home() {
  return (
    <Box mt={10}>
      <Grid
        h="200px"
        templateRows="repeat(1, 1fr)"
        templateColumns="repeat(7, 1fr)"
        gap={4}
      >
        <GridItem rowSpan={1} colSpan={2}>
          <Stack>
            <Link href="/add-session">
              <SideBarItem>
                <Text>Add Session</Text>
              </SideBarItem>
            </Link>
            <Link href="/add-semester">
              <SideBarItem>
                <Text>Add Semester</Text>
              </SideBarItem>
            </Link>
            <Link href="/add-department">
              <SideBarItem>
                <Text>Add Department</Text>
              </SideBarItem>
            </Link>
            <Link href="/add-course">
              <SideBarItem>
                <Text>Add Course</Text>
              </SideBarItem>
            </Link>
            <Link href="/add-student">
              <SideBarItem>
                <Text>Add student</Text>
              </SideBarItem>
            </Link>
            <Link href="/add-faculty">
              <SideBarItem>
                <Text>Add faculty</Text>
              </SideBarItem>
            </Link>
            <Link href="/assign-course-to-faculty">
              <SideBarItem>
                <Text>Assign course to faculty</Text>
              </SideBarItem>
            </Link>
          </Stack>
        </GridItem>
        <GridItem colSpan={5} bg="gray.50">
          <Stack>
            <Link href="/departments">
              <Box bg="gray.100" cursor="pointer">
                <Text p={4}>Departments</Text>
              </Box>
            </Link>

            <Link href="/sessions">
              <Box bg="gray.100" cursor="pointer">
                <Text p={4}>Session</Text>
              </Box>
            </Link>
            <Link href="/semesters">
              <Box bg="gray.100" cursor="pointer">
                <Text p={4}>Semesters</Text>
              </Box>
            </Link>
            <Link href="/students">
              <Box bg="gray.100" cursor="pointer">
                <Text p={4}>Students</Text>
              </Box>
            </Link>
            <Link href="/faculties">
              <Box bg="gray.100" cursor="pointer">
                <Text p={4}>Faculties</Text>
              </Box>
            </Link>
            <Link href="/class-schedule">
              <Box bg="gray.100" cursor="pointer">
                <Text p={4}>Class Schedule</Text>
              </Box>
            </Link>
          </Stack>
        </GridItem>
      </Grid>
    </Box>
  );
}
