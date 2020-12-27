import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Divider,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaChevronRight } from "react-icons/fa";
import LoadingSpinner from "../../components/LoadingSpinner";
import { useSessionsQuery } from "../../generated/graphql";

const Post = () => {
  const router = useRouter();
  const { departmentCode } = router.query;
  const { data, loading } = useSessionsQuery();

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Box mt={10}>
      <Breadcrumb spacing="8px" separator={<FaChevronRight color="gray.500" />}>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">{departmentCode}</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Divider my={4} bg="gray.900" h=".5px" />
      {data.sessions.map((s) => (
        <Link href={`/${departmentCode}/${s.id}`} key={s.id}>
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
};

export default Post;
