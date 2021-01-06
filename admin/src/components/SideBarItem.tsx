import { Flex, FlexProps } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";

export const SideBarItem = (props: FlexProps) => (
  <Flex
    align="center"
    justify="space-between"
    p={4}
    bg="purple.500"
    cursor="pointer"
    color="white"
    {...props}
  >
    {props.children}
    <FaPlus />
  </Flex>
);
