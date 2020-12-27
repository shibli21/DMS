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
import { useFacultiesQuery } from "../../generated/graphql";

export default function Faculties() {
  const { data } = useFacultiesQuery();
  if (!data) {
    return (
      <Alert colorScheme="red" mt={4}>
        No Faculty data found!!!
      </Alert>
    );
  }
  return (
    <Box mt={10}>
      <Text my={6} textAlign="center" fontSize="3xl">
        Faculties
      </Text>
      <Table>
        <Thead>
          <Tr>
            <Th>Designation</Th>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.faculties.map((s) => (
            <Tr>
              <Td>
                <Text>{s.designation}</Text>
              </Td>
              <Td>{s.username}</Td>
              <Td>{s.email}</Td>
              <Td>
                <HStack>
                  <Link href="#">
                    <Box
                      cursor="pointer"
                      as={FaTrash}
                      _hover={{ color: "red.500" }}
                    />
                  </Link>
                  <Link href={`/faculties/edit/${s.id}`}>
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
