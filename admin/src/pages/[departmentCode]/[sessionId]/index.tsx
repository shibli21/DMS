import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Divider,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FaChevronRight } from "react-icons/fa";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { useSemestersByDepartmentAndSessionQuery } from "../../../generated/graphql";

const Post = () => {
  const router = useRouter();
  const { departmentCode, sessionId } = router.query;
  const { data, loading } = useSemestersByDepartmentAndSessionQuery({
    variables: {
      code: departmentCode,
      sessionId: parseInt(sessionId),
    },
  });

  if (loading) {
    return <LoadingSpinner />;
  }
  if (!data) {
    return <Box>No Data</Box>;
  }

  return (
    <Box mt={10}>
      <Breadcrumb spacing="8px" separator={<FaChevronRight color="gray.500" />}>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink href={`/${departmentCode}`}>
            {departmentCode}
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink href={`/${departmentCode}/${sessionId}`}>
            {sessionId}
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Divider my={4} bg="gray.900" h=".5px" />

      {data.semestersByDepartmentAndSession.map((s) => (
        <Box key={s.id}>{s.number}</Box>
      ))}
    </Box>
  );
};

export default Post;
