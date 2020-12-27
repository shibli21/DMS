import {
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
import { useSemestersQuery } from "../../generated/graphql";

interface Props {}

const Semesters = (props: Props) => {
  const { data, loading } = useSemestersQuery();
  if (!data) {
    return <Box>No Data</Box>;
  }

  return (
    <Box mt={10}>
      <Text my={6} textAlign="center" fontSize="3xl">
        Semesters
      </Text>
      <Table>
        <Thead>
          <Tr>
            <Th>Semester Number</Th>
            <Th>Start</Th>
            <Th>End</Th>
            <Th>Department</Th>
            <Th>Session</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.semesters.map((s) => (
            <Tr>
              <Td>
                <Text>{s.number}</Text>
              </Td>
              <Td>{s.startTime}</Td>
              <Td>{s.endTime}</Td>
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
                  <Link href={`/semesters/edit/${s.id}`}>
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
};

export default Semesters;
