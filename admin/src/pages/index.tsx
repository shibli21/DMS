import { Box, Flex, Grid, Heading, Text } from "@chakra-ui/react";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";

export default function Home() {
  return (
    <Box mt={10}>
      <Grid templateColumns="1fr 1fr 1fr 1fr">
        <Link href="/add-session">
          <Flex
            align="center"
            justify="space-between"
            bg="teal.300"
            p={4}
            cursor="pointer"
          >
            <Text>Add Session</Text>
            <FaPlus />
          </Flex>
        </Link>
      </Grid>
    </Box>
  );
}
