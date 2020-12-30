import { Box, Container } from "@chakra-ui/react";

export default function Home() {
  return (
    <>
      <Box
        as="nav"
        height="60px"
        bgGradient="linear(to-r,#7928CA,#FF0080)"
      ></Box>
      <Container maxW="7xl">
        <Box>HOME PAGE</Box>
      </Container>
    </>
  );
}
