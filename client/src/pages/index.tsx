import Head from "next/head";
import { useRouter } from "next/router";
import CoursesAssignToFaculty from "../components/CoursesAssignToFaculty";
import TodaySchedule from "../components/TodaySchedule";
import { useMeQuery } from "../generated/graphql";

export default function Home() {
  const router = useRouter();
  const { data: me, loading: meLoading } = useMeQuery();
  if (meLoading) {
    return null;
  }

  if (!me?.me) {
    router.push("/login");
  }

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <TodaySchedule />
      <CoursesAssignToFaculty />
    </>
  );
}
