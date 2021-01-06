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
import LoadingSpinner from "../../../components/LoadingSpinner";
import withPrivateRoute from "../../../components/withPrivateRoute";
import { useSessionsQuery } from "../../../generated/graphql";

const Sessions = () => {
  const router = useRouter();
  const { departmentCode } = router.query;
  const { data, loading } = useSessionsQuery();

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Box mt={10}>
      <Breadcrumb spacing="8px" separator={<FaChevronRight color="gray.500" />}>
        <BreadcrumbItem>
          <BreadcrumbLink href="/class-schedule">Class schedule</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink>{departmentCode}</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Divider my={4} bg="gray.900" h=".5px" />
      <Text my={6} textAlign="center" fontSize="3xl">
        Sessions
      </Text>
      <Grid templateColumns="repeat(3, 1fr)" gap={4}>
        {data.sessions.map((s) => (
          <GridItem cursor="pointer">
            <Link
              href={`/class-schedule/${departmentCode}/${s.id}?sessionName=${s.name}`}
              key={s.id}
            >
              <Text bg="blue.200" p={4}>
                {s.name}
              </Text>
            </Link>
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
};

export default withPrivateRoute(Sessions);
