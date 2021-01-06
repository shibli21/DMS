import {
  Alert,
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
import {
  StudentsDocument,
  useDeleteStudentMutation,
  useStudentsQuery,
} from "../../generated/graphql";

function Students() {
  const [studentId, setStudentId] = useState<number>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [deleteStudent] = useDeleteStudentMutation();
  const { data } = useStudentsQuery();
  const toast = useToast();

  if (!data) {
    return (
      <Alert colorScheme="red" mt={4}>
        No Student data found!!!
      </Alert>
    );
  }
  return (
    <>
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
              <Th>Token</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.students.map((s) => (
              <Tr key={s.id}>
                <Td>
                  <Text>{s.registrationNumber}</Text>
                </Td>
                <Td>{s.username}</Td>
                <Td>{s.department.name}</Td>
                <Td>{s.session.name}</Td>
                <Td>
                  {s.oneTimePassword ? (
                    s.oneTimePassword
                  ) : (
                    <Button size="sm" colorScheme="purple">
                      Reset Topken
                    </Button>
                  )}
                </Td>
                <Td>
                  <HStack>
                    <Box
                      onClick={() => {
                        setStudentId(s.id);
                        onOpen();
                      }}
                      cursor="pointer"
                      as={FaTrash}
                      _hover={{ color: "red.500" }}
                    />
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
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalBody p={4}>
            <Flex justify="space-between" align="center">
              <Text>Do you want to delete ?</Text>
              <HStack>
                <Button onClick={onClose} colorScheme="green">
                  o
                </Button>
                <Button
                  onClick={() => {
                    onClose();
                    deleteStudent({
                      variables: {
                        id: studentId,
                      },
                      refetchQueries: [
                        {
                          query: StudentsDocument,
                        },
                      ],
                    });
                    toast({
                      position: "bottom-right",
                      description: "Student delete successful",
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
}

export default withPrivateRoute(Students);
