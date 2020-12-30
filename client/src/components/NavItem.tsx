import { Text } from "@chakra-ui/react";
import React from "react";

interface NavItemProps {}

const NavItem: React.FC<NavItemProps> = ({ children }) => (
  <Text
    fontSize="1.125rem"
    ml={[0, 0, 6, 6]}
    mb={[4, 4, 0, 0]}
    color="gray.100"
  >
    {children}
  </Text>
);

export default NavItem;
