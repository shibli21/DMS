import { Box, Flex, Text } from "@chakra-ui/react";
import Head from "next/head";
import TodaySchedule from "../components/TodaySchedule";

export default function Home() {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <TodaySchedule />
    </>
  );
}
