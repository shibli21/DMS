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
import LoadingSpinner from "../../../../components/LoadingSpinner";
import { useSemestersByDepartmentAndSessionQuery } from "../../../../generated/graphql";
import { getSemesterName } from "../../../../utils/getSemesterName";

const index = () => {
  const router = useRouter();
  const sesId =
    typeof router.query.sessionId === "string"
      ? parseInt(router.query.sessionId)
      : -1;
  const dcode =
    typeof router.query.departmentCode === "string"
      ? router.query.departmentCode
      : -1;
  const { departmentCode, sessionId, sessionName } = router.query;
  console.log("🚀 ", router.query);

  const { data, loading } = useSemestersByDepartmentAndSessionQuery({
    variables: {
      code: encodeURIComponent(dcode),
      sessionId: sesId,
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
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink>{sessionName}</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Divider my={4} bg="gray.900" h=".5px" />
      <Text my={6} textAlign="center" fontSize="3xl">
        Semesters
      </Text>
      <Grid templateColumns="repeat(4, 1fr)" gap={4}>
        {data.semestersByDepartmentAndSession.map((s) => (
          <GridItem cursor="pointer" bg="blue.200">
            <Link
              href={`/class-schedule/${departmentCode}/${sessionId}/${s.number}?sessionName=${sessionName}`}
              key={s.id}
            >
              <Text p={4}>{getSemesterName(s.number)}</Text>
            </Link>
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
};

export default index;
