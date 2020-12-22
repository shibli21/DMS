import { Box, chakra, Text } from "@chakra-ui/react";
import React from "react";

interface NavItemProps {}

const NavItem: React.FC<NavItemProps> = ({ children }) => (
  <Text fontSize="1.125rem" ml={[0, 0, 6, 6]}>
    {children}
  </Text>
);

export default NavItem;
