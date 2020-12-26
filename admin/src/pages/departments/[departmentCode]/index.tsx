import { Box, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { useSessionsQuery } from "../../../generated/graphql";

const Post = () => {
  const router = useRouter();
  const { departmentCode } = router.query;
  const { data, loading } = useSessionsQuery();

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Box mt={10}>
      {data.sessions.map((d) => (
        <Link href={`/departments/${departmentCode}/${d.name}`} key={d.id}>
          <Box mb={4} bg="red.400" p={2} cursor="pointer">
            <Text>{d.name}</Text>
          </Box>
        </Link>
      ))}
    </Box>
  );
};

export default Post;
