import { Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";

interface Props {}

const Department = (props: Props) => {
  const router = useRouter();
  const { departmentCode } = router.query;
  return <Box>{departmentCode}</Box>;
};

export default Department;
