import { Flex, FlexProps } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";

export const SideBarItem = (props: FlexProps) => (
  <Flex
    align="center"
    justify="space-between"
    bg="teal.300"
    p={4}
    cursor="pointer"
    {...props}
  >
    {props.children}
    <FaPlus />
  </Flex>
);
