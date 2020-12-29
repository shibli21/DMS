import { Alert, Box, Button, Flex, HStack, Modal, ModalBody, ModalContent, ModalOverlay, Table, Tbody, Td, Text, Th, Thead, Tr, useDisclosure, useToast } from "@chakra-ui/react";
import Link from "next/link";
import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { SessionsDocument, useDeleteSessionMutation, useSessionsQuery } from "../../generated/graphql";

export default function Sessions() {
  const { data } = useSessionsQuery();
  const [sessionId, setSessionId] = useState<number>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [deleteSession] = useDeleteSessionMutation();
  const toast = useToast();
  if (!data) {
    return (
      <Alert colorScheme="blue" mt={4}>
        No Sessions
      </Alert>
    );
  }
  return (
    <>
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
                    <Box
                      onClick={() => {
                        setSessionId(s.id);
                        onOpen();
                      }}
                      cursor="pointer"
                      as={FaTrash}
                      _hover={{ color: "red.500" }}
                    />
                    <Link href={`/sessions/edit/${s.id}`}>
                      <Box cursor="pointer" as={FaEdit} _hover={{ color: "blue.500" }} />
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
                    deleteSession({
                      variables: {
                        id: sessionId,
                      },
                      refetchQueries: [
                        {
                          query: SessionsDocument,
                        },
                      ],
                    });
                    toast({
                      position: "bottom-right",
                      description: "Session delete successful",
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
