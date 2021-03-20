import {
  Box,
  Button,
  Flex,
  HStack,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import Link from "next/link";
import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import withPrivateRoute from "../../components/withPrivateRoute";
import { SemestersDocument, useDeleteSemesterMutation, useSemestersQuery } from "../../generated/graphql";

interface Props {}

const Semesters = (props: Props) => {
  const [semesterId, setSemesterId] = useState<number>();
  const { data } = useSemestersQuery();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [deleteSemester] = useDeleteSemesterMutation();
  const toast = useToast();

  if (!data) {
    return <Box>No Data</Box>;
  }

  return (
    <>
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
                    <Box
                      onClick={() => {
                        setSemesterId(s.id);
                        onOpen();
                      }}
                      cursor="pointer"
                      as={FaTrash}
                      _hover={{ color: "red.500" }}
                    />
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>{" "}
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalBody p={4}>
            <Flex justify="space-between" align="center">
              <Text>Do you want to delete ?</Text>
              <HStack>
                <Button onClick={onClose} colorScheme="green">
                  No
                </Button>
                <Button
                  onClick={() => {
                    onClose();
                    deleteSemester({
                      variables: {
                        id: semesterId,
                      },
                      refetchQueries: [
                        {
                          query: SemestersDocument,
                        },
                      ],
                    });
                    toast({
                      position: "bottom-right",
                      description: "Semester delete successful",
                      status: "error",
                      duration: 9000,
                      isClosable: true,
                    });
                  }}
                  colorScheme="red"
                >
                  Yes
                </Button>
              </HStack>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default withPrivateRoute(Semesters);
