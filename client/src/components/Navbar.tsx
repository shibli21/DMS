import {
  Box,
  Button,
  ChakraProps,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerOverlay,
  Flex,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import { default as Link, default as NextLink } from "next/link";
import React from "react";
import { FaBars } from "react-icons/fa";
import { RiCloseFill } from "react-icons/ri";
import {
  MeDocument,
  useLogoutMutation,
  useMeQuery,
} from "../generated/graphql";
import NavItem from "./NavItem";

const NavBar = (props: ChakraProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data, loading } = useMeQuery();
  const [logout] = useLogoutMutation();

  let NavLinks: ReactJSXElement = null;

  if (loading) {
  } else if (data?.me?.student?.id) {
    NavLinks = (
      <>
        <NavItem>
          <Link href="/class-schedule">Class Routine</Link>
        </NavItem>
        <NavItem>
          <Link href={`/profile/${data?.me?.student?.id}`}>
            {data?.me?.student?.username}
          </Link>
        </NavItem>
        <NavItem>
          <Button
            size="sm"
            variant="solid"
            colorScheme="purple"
            onClick={() =>
              logout({
                refetchQueries: [{ query: MeDocument }],
              })
            }
          >
            Logout
          </Button>
        </NavItem>
      </>
    );
  } else if (data?.me?.faculty?.id) {
    NavLinks = (
      <>
        <NavItem>
          <Link href="/class-schedule">Class Routine</Link>
        </NavItem>
        <NavItem>
          <Link href={`/profile/${data?.me?.faculty?.id}`}>
            {data?.me?.faculty?.username}
          </Link>
        </NavItem>
        <NavItem>
          <Button
            size="sm"
            variant="solid"
            colorScheme="purple"
            onClick={() =>
              logout({
                refetchQueries: [{ query: MeDocument }],
              })
            }
          >
            Logout
          </Button>
        </NavItem>
      </>
    );
  } else {
    NavLinks = (
      <>
        <NavItem>
          <Button
            size="sm"
            variant="outline"
            colorScheme="gray"
            color="gray.100"
            _hover={{ bg: "gray.100", color: "gray.900" }}
          >
            <Link href="/register">Sign up</Link>
          </Button>
        </NavItem>
        <NavItem>
          <Button size="sm" variant="solid" colorScheme="purple">
            <Link href="/login">Sign in</Link>
          </Button>
        </NavItem>
      </>
    );
  }

  return (
    <Box
      top={0}
      position="sticky"
      as="header"
      zIndex={100}
      bg="gray.900"
      mb={10}
    >
      <Flex
        h="60px"
        as="nav"
        align="center"
        justify="space-between"
        wrap="wrap"
        px={"1rem"}
        mx="auto"
        maxW="7xl"
        {...props}
      >
        <Box>
          <NextLink href="/">
            <Text color="white" cursor="pointer">
              Department Management System
            </Text>
          </NextLink>
        </Box>
        <Flex display={["none", "none", "inherit", "inherit"]} align="center">
          {NavLinks}
        </Flex>
        <Box display={["block", "block", "none", "none"]}>
          <>
            <Box color="white" onClick={onOpen}>
              <FaBars size="25px" />
            </Box>
            <Drawer
              size="xs"
              isOpen={isOpen}
              placement="right"
              onClose={onClose}
            >
              <DrawerOverlay>
                <DrawerContent bg="gray.800" alignItems="center">
                  <DrawerCloseButton m=".25rem">
                    <Box>
                      <RiCloseFill size="25px" color="white" />
                    </Box>
                  </DrawerCloseButton>
                  <DrawerBody pt="90px" alignItems="center">
                    {NavLinks}
                  </DrawerBody>
                  <DrawerFooter></DrawerFooter>
                </DrawerContent>
              </DrawerOverlay>
            </Drawer>
          </>
        </Box>
      </Flex>
    </Box>
  );
};

export default NavBar;
