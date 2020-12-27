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
import { useSessionsQuery } from "../../generated/graphql";

export default function Sessions() {
  const { data } = useSessionsQuery();
  if (!data) {
    return (
      <Alert colorScheme="blue" mt={4}>
        No Sessions
      </Alert>
    );
  }
  return (
    <Box mt={10}>
      <Text my={6} textAlign="center" fontSize="3xl">
        Sessions
      </Text>
      <Table>
        <Thead>
          <Tr>
            <Th>Session Name</Th>
            <Th>Start</Th>
            <Th>End</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.sessions.map((s) => (
            <Tr>
              <Td>
                <Text>{s.name}</Text>
              </Td>
              <Td>{s.startTime}</Td>
              <Td>{s.endTime}</Td>
              <Td>
                <HStack>
                  <Link href="#">
                    <Box
                      cursor="pointer"
                      as={FaTrash}
                      _hover={{ color: "red.500" }}
                    />
                  </Link>
                  <Link href={`/sessions/edit/${s.id}`}>
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
