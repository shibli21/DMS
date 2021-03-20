import { Container, Text } from "@chakra-ui/react";
import React from "react";

interface Props {}

const TestResults = (props: Props) => {
  return (
    <Container>
      <Text textAlign="center" fontWeight="bold" fontSize="3xl" bg="purple.600" p={2} color="white">
        Exam Schedule
      </Text>
      <Text textAlign="center" fontSize="2xl" m={4}>
        Exam schedule will be publish here
      </Text>
    </Container>
  );
};

export default TestResults;
