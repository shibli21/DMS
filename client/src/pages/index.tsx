import { Box, Divider, Grid, Image, Text } from "@chakra-ui/react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import TodaySchedule from "../components/TodaySchedule";
import { useMeQuery } from "../generated/graphql";

interface CardProps {
  bg: string;
  iconUrl: string;
  title: string;
  to: string;
}

const Card = ({ bg, iconUrl, title, to }: CardProps) => {
  return (
    <Link href={to}>
      <Box h="100px" cursor="pointer" bg={bg} p={4} display="flex" justifyContent="space-between" alignItems="center">
        <Text color="white" fontSize="24px" fontWeight="bold">
          {title}
        </Text>
        <Image width="80px" height="auto" src={iconUrl} />
      </Box>
    </Link>
  );
};

export default function Home() {
  const router = useRouter();
  const { data: me, loading: meLoading } = useMeQuery();
  if (meLoading) {
    return null;
  }

  if (!me?.me?.faculty && !me?.me?.student) {
    router.push("/login");
  }

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Box py={5}>
        <Grid templateColumns={["1fr", "1fr 1fr", "1fr 1fr 1fr"]} columnGap="30px" rowGap="20px">
          <Card bg="green.400" iconUrl="/course.svg" title="My Courses" to="/my-courses" />
          <Card bg="cyan.700" iconUrl="/routine.svg" title="Class Routine" to="class-schedule" />
          <Card bg="gray.400" iconUrl="/books.svg" title="E-library" to="e-library" />
          <Card bg="blue.400" iconUrl="/result.svg" title="Test Results" to="test-results" />
          {me?.me?.student && <Card bg="red.400" iconUrl="/board.svg" title="Notice Board" to="notice-board" />}
          <Card bg="purple.600" iconUrl="/exam.svg" title="Exam Schedule" to="exam-schedule" />
        </Grid>
      </Box>
    </>
  );
}
