import {
  Box,
  Flex,
  HStack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import LoadingSpinner from "../../components/LoadingSpinner";
import { useDepartmentsQuery } from "../../generated/graphql";

interface Props {}

const Departments = (props: Props) => {
  const { data, loading } = useDepartmentsQuery();

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <Box mt={10}>
        <Text my={6} textAlign="center" fontSize="3xl">
          Departments
        </Text>
        <Table>
          <Thead>
            <Tr>
              <Th>Code</Th>
              <Th>Name</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.departments.map((d) => (
              <Tr>
                <Td>
                  <Text>{d.departmentCode}</Text>
                </Td>
                <Td>
                  <Link href={`/${d.departmentCode}`}>{d.name}</Link>
                </Td>
                <Td>
                  <HStack>
                    <Link href="#">
                      <Box
                        cursor="pointer"
                        as={FaTrash}
                        _hover={{ color: "red.500" }}
                      />
                    </Link>
                    <Link href={`/departments/edit/${d.departmentCode}`}>
                      <Box
                        cursor="pointer"
                        as={FaEdit}
                        _hover={{ color: "blue.500" }}
                      />
                    </Link>
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </>
  );
};

export default Departments;
