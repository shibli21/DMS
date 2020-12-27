import {
  Alert,
  Box,
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
import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useStudentsQuery } from "../../generated/graphql";

export default function Students() {
  const { data } = useStudentsQuery();
  if (!data) {
    return (
      <Alert colorScheme="red" mt={4}>
        No Student data found!!!
      </Alert>
    );
  }
  return (
    <Box mt={10}>
      <Text my={6} textAlign="center" fontSize="3xl">
        Students
      </Text>
      <Table>
        <Thead>
          <Tr>
            <Th>Reg No.</Th>
            <Th>Name</Th>
            <Th>Department</Th>
            <Th>Session</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.students.map((s) => (
            <Tr>
              <Td>
                <Text>{s.registrationNumber}</Text>
              </Td>
              <Td>{s.username}</Td>
              <Td>{s.department.name}</Td>
              <Td>{s.session.name}</Td>
              <Td>
                <HStack>
                  <Link href="#">
                    <Box
                      cursor="pointer"
                      as={FaTrash}
                      _hover={{ color: "red.500" }}
                    />
                  </Link>
                  <Link href={`/students/edit/${s.id}`}>
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
  );
}
