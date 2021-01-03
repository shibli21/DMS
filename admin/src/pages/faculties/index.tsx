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
import {
  FacultiesDocument,
  useDeleteFacultyMutation,
  useFacultiesQuery,
} from "../../generated/graphql";

export default function Faculties() {
  const [facultyId, setFacultyId] = useState<number>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [deleteFaculty] = useDeleteFacultyMutation();
  const toast = useToast();
  const { data } = useFacultiesQuery();
  if (!data) {
    return (
      <Alert colorScheme="red" mt={4}>
        No Faculty data found!!!
      </Alert>
    );
  }
  return (
    <>
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
              <Th>Token</Th>
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
                <Td>{s.oneTimePassword}</Td>
                <Td>
                  <HStack>
                    <Box
                      onClick={() => {
                        setFacultyId(s.id);
                        onOpen();
                      }}
                      cursor="pointer"
                      as={FaTrash}
                      _hover={{ color: "red.500" }}
                    />
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
                    deleteFaculty({
                      variables: {
                        id: facultyId,
                      },
                      refetchQueries: [
                        {
                          query: FacultiesDocument,
                        },
                      ],
                    });
                    toast({
                      position: "bottom-right",
                      description: "Faculty delete successful",
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
