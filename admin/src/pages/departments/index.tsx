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
import LoadingSpinner from "../../components/LoadingSpinner";
import withPrivateRoute from "../../components/withPrivateRoute";
import { DepartmentsDocument, useDeleteDepartmentMutation, useDepartmentsQuery } from "../../generated/graphql";

interface Props {}

const Departments = (props: Props) => {
  const [departmentCode, setDepartmentCode] = useState("");
  const { data, loading } = useDepartmentsQuery();
  const [deleteDepartment] = useDeleteDepartmentMutation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

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
                <Td>{d.name}</Td>
                <Td>
                  <HStack>
                    <Box
                      onClick={() => {
                        setDepartmentCode(d.departmentCode);
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
                    deleteDepartment({
                      variables: {
                        code: departmentCode,
                      },
                      refetchQueries: [
                        {
                          query: DepartmentsDocument,
                        },
                      ],
                    });
                    toast({
                      position: "bottom-right",
                      description: "Department delete successful",
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

export default withPrivateRoute(Departments);
