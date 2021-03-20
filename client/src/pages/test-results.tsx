import { Container, Text } from "@chakra-ui/react";
import React from "react";

interface Props {}

const TestResults = (props: Props) => {
  return (
    <Container>
      <Text textAlign="center" fontWeight="bold" fontSize="3xl" bg="blue.400" p={2} color="white">
        Test Results
      </Text>
      <Text textAlign="center" fontSize="2xl" m={4}>
        This page will be connected to the result system
      </Text>
    </Container>
  );
};

export default TestResults;
