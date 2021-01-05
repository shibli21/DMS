import { Flex, Spinner } from "@chakra-ui/react";
import React from "react";

interface Props {}

const LoadingSpinner = (props: Props) => {
  return (
    <Flex minH="200px" justify="center" align="center">
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="purple.500"
        size="xl"
      />
    </Flex>
  );
};

export default LoadingSpinner;
