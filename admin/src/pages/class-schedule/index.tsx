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
import React from "react";
import { FaChevronRight } from "react-icons/fa";
import LoadingSpinner from "../../components/LoadingSpinner";
import withPrivateRoute from "../../components/withPrivateRoute";
import { useDepartmentsQuery } from "../../generated/graphql";

interface Props {}

const Departments = (props: Props) => {
  const { data, loading } = useDepartmentsQuery();

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Box mt={10}>
      <Breadcrumb spacing="8px" separator={<FaChevronRight color="gray.500" />}>
        <BreadcrumbItem>
          <BreadcrumbLink isCurrentPage>Class schedule</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Divider my={4} bg="gray.900" h=".5px" />
      <Text my={6} textAlign="center" fontSize="3xl">
        Departments
      </Text>
      <Grid templateColumns="repeat(3, 1fr)" gap={4}>
        {data.departments.map((d) => (
          <GridItem p={4} bg="blue.200">
            <Link href={`/class-schedule/${d.departmentCode}`}>{d.name}</Link>
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
};

export default withPrivateRoute(Departments);
