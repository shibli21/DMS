import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Divider,
  Grid,
  GridItem,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaChevronRight } from "react-icons/fa";
import LoadingSpinner from "../../../../../components/LoadingSpinner";
import { useCoursesByDeptSemesterQuery } from "../../../../../generated/graphql";
import { getSemesterName } from "../../../../../utils/getSemesterName";

const index = () => {
  const router = useRouter();

  const semId =
    typeof router.query.semesterId === "string"
      ? parseInt(router.query.semesterId)
      : -1;
  const dcode =
    typeof router.query.departmentCode === "string"
      ? router.query.departmentCode
      : -1;
  const { departmentCode, sessionId, semesterId, sessionName } = router.query;
  console.log("🚀 ", router.query);

  const { data, loading } = useCoursesByDeptSemesterQuery({
    variables: {
      departmentCode: encodeURIComponent(dcode),
      semesterId: semId,
    },
  });

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
          <BreadcrumbLink href={`/class-schedule/${departmentCode}`}>
            {departmentCode}
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink
            href={`/class-schedule/${departmentCode}/${sessionId}?sessionName=${sessionName}`}
          >
            {sessionName}
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink>{getSemesterName(semId)}</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Divider my={4} bg="gray.900" h=".5px" />
      <Text my={6} textAlign="center" fontSize="3xl">
        Courses
      </Text>
      <Grid templateColumns="repeat(4, 1fr)" gap={4}>
        {data.coursesByDeptSemester.map((c) => (
          <GridItem cursor="pointer" bg="blue.200">
            <Link
              href={`/class-schedule/${departmentCode}/${sessionId}/${semesterId}/${c.code}?sessionName=${sessionName}`}
              key={c.id}
            >
              <Text p={4}>{c.name}</Text>
            </Link>
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
};

export default index;
