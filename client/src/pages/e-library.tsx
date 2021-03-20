import { Container, Text } from "@chakra-ui/react";
import React from "react";

interface Props {}

const ELibrary = (props: Props) => {
  return (
    <Container>
      <Text textAlign="center" fontWeight="bold" fontSize="3xl" bg="gray.400" p={2} color="white">
        E-Library
      </Text>
      <Text textAlign="center" fontSize="2xl" m={4}>
        This page will be connected to the e-library system
      </Text>
    </Container>
  );
};

export default ELibrary;
