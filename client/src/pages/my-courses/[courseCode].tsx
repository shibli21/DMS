import { Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";

interface Props {}

const MyCourse = (props: Props) => {
  const router = useRouter();
  console.log("🚀 MyCourse ~ router", router);
  return (
    <>
      <Text>{router.query.courseCode}</Text>
      <Text>{router.query.sessionName}</Text>
      <Text>{router.query.departmentCode}</Text>
    </>
  );
};

export default MyCourse;
