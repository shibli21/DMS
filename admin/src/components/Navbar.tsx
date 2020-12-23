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
  Stack,
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
  const { data } = useMeQuery();
  const [logout] = useLogoutMutation();

  let NavLinks: ReactJSXElement;

  if (data?.me?.admin?.id) {
    NavLinks = (
      <>
        <NavItem>{data?.me?.admin?.username}</NavItem>
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
            <Link href="/admin-register">Sign up</Link>
          </Button>
        </NavItem>
        <NavItem>
          <Button size="sm" variant="solid" colorScheme="purple">
            <Link href="/admin-login">Sign in</Link>
          </Button>
        </NavItem>
      </>
    );
  }

  return (
    <Box top={0} position="sticky" as="header" zIndex={100} bg="gray.900">
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        padding="1rem"
        maxW="7xl"
        mx="auto"
      >
        <Box>
          <NextLink href="/">
            <Text color="white" cursor="pointer">
              Logo
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
                <DrawerContent>
                  <DrawerCloseButton m=".25rem">
                    <Box>
                      <RiCloseFill size="25px" />
                    </Box>
                  </DrawerCloseButton>
                  <DrawerBody pt="90px">
                    <Stack>{NavLinks}</Stack>
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
