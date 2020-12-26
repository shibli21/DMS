import { Box, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import LoadingSpinner from "../../components/LoadingSpinner";
import { useDepartmentsQuery } from "../../generated/graphql";

interface Props {}

const Departments = (props: Props) => {
  const { data, loading } = useDepartmentsQuery();

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Box mt={10}>
      {data.departments.map((d) => (
        <Link href={`/departments/${d.departmentCode}`} key={d.id}>
          <Box mb={4} bg="red.400" p={2} cursor="pointer">
            <Text>{d.name}</Text>
          </Box>
        </Link>
      ))}
    </Box>
  );
};

export default Departments;
