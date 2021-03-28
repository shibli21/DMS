import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Divider,
  HStack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { DateTime } from "luxon";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaChevronRight, FaTrash } from "react-icons/fa";
import LoadingSpinner from "../../../../../../components/LoadingSpinner";
import withPrivateRoute from "../../../../../../components/withPrivateRoute";
import { useClassScheduleByAllQuery, useDeleteClassScheduleMutation } from "../../../../../../generated/graphql";
import { getDayName } from "../../../../../../utils/getDayName";
import { getSemesterName } from "../../../../../../utils/getSemesterName";

const ClassSchedule = () => {
  const router = useRouter();

  const semId = typeof router.query.semesterId === "string" ? parseInt(router.query.semesterId) : -1;
  const sesId = typeof router.query.sessionId === "string" ? parseInt(router.query.sessionId) : -1;
  const ccode = typeof router.query.courseCode === "string" ? router.query.courseCode : -1;

  const dcode = typeof router.query.departmentCode === "string" ? router.query.departmentCode : -1;
  const semesterNumber = typeof router.query.semesterNumber === "string" ? parseInt(router.query.semesterNumber) : -1;

  const { courseCode, sessionId, semesterId, sessionName, departmentCode } = router.query;

  const { data, loading } = useClassScheduleByAllQuery({
    variables: {
      departmentCode: dcode,
      semesterId: semId,
      courseCode: ccode,
      sessionId: sesId,
    },
  });

  const [deleteClassSchedule] = useDeleteClassScheduleMutation();

  if (loading) {
    return <LoadingSpinner />;
  }
  if (!data) {
    return <Box>No Data</Box>;
  }

  return (
    <Box mt={10}>
      <Breadcrumb spacing="8px" separator={<FaChevronRight color="gray.500" />}>
        <BreadcrumbItem>
          <BreadcrumbLink href="/class-schedule">Class schedule</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink href={`/class-schedule/${departmentCode}`}>{departmentCode}</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink
            href={`/class-schedule/${departmentCode}/${sessionId}?sessionName=${sessionName}&semesterNumber=${semesterNumber}`}
          >
            {sessionName}
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink
            href={`/class-schedule/${departmentCode}/${sessionId}/${semesterId}?sessionName=${sessionName}&semesterNumber=${semesterNumber}`}
          >
            {getSemesterName(semesterNumber)}
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink>{courseCode}</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Divider my={4} bg="gray.900" h=".5px" />
      <Text my={6} textAlign="center" fontSize="3xl">
        Class schedule
      </Text>

      <Table>
        <Thead>
          <Tr>
            <Th>Day</Th>
            <Th>Start Time</Th>
            <Th>End Time</Th>
            <Th>Faculty</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.classScheduleByAll.map((d) => (
            <Tr>
              <Td>
                <Text>{getDayName(d.day)}</Text>
              </Td>
              <Td>{DateTime.fromISO(d.startTime).toLocaleString(DateTime.TIME_SIMPLE)}</Td>
              <Td>{DateTime.fromISO(d.endTime).toLocaleString(DateTime.TIME_SIMPLE)}</Td>
              <Td>{d.faculty.username}</Td>
              <Td>
                <HStack>
                  <Link href="/">
                    <Box
                      cursor="pointer"
                      as={FaTrash}
                      _hover={{ color: "red.500" }}
                      onClick={() => {
                        deleteClassSchedule({
                          variables: {
                            id: d.id,
                          },
                        });
                        router.reload();
                      }}
                    />
                  </Link>
                </HStack>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default withPrivateRoute(ClassSchedule);
