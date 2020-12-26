import { Alert, Box, Flex, Grid, Heading, Text } from "@chakra-ui/react";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";
import { useSessionsQuery } from "../generated/graphql";

export default function Sessions() {
  const { data } = useSessionsQuery();
  if (!data) {
    return (
      <Alert colorScheme="blue" mt={4}>
        No Sessions
      </Alert>
    );
  }
  return (
    <Box mt={10}>
      {data.sessions.map((s) => (
        <Link href="/departments/sessions/[sessionId]">
          <Box cursor="pointer" bg="blue.300" p={4} maxW="400px" mb={4}>
            <Text>{s.name}</Text>
            <Text>
              {s.startTime} - {s.endTime}
            </Text>
          </Box>
        </Link>
      ))}
    </Box>
  );
}
