import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import React, { useState } from "react";
import NavItem from "./NavItem";

interface Props {}

const Navbar = (props: Props) => {
  const [show, setShow] = useState(false);
  const handleToggle = () => setShow(!show);

  return (
    <Box
      as="nav"
      top={0}
      position="sticky"
      boxShadow="xs"
      bg="gray.900"
      {...props}
    >
      <Flex
        align="center"
        wrap="wrap"
        padding="1rem"
        justify="space-between"
        maxW="7xl"
        mx="auto"
      >
        <Flex>
          <Heading color="white" as="h1" size="lg" letterSpacing={"-.1rem"}>
            Logo
          </Heading>
        </Flex>

        <Box
          display={["block", "block", "none", "none"]}
          onClick={handleToggle}
        >
          <svg
            fill="white"
            width="12px"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </Box>

        <Box
          display={[
            `${show ? "block" : "none"}`,
            `${show ? "block" : "none"}`,
            "flex",
            "flex",
          ]}
          width={["full", "full", "auto", "auto"]}
          alignItems="center"
        >
          <NavItem>
            <Button size="sm" variant="outline" colorScheme="white">
              Sign up
            </Button>
          </NavItem>
          <NavItem>
            <Button size="sm" variant="solid" colorScheme="blue">
              Sign in
            </Button>
          </NavItem>
        </Box>
      </Flex>
    </Box>
  );
};

export default Navbar;
