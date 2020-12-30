import { Container, Heading } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
interface Props {}

const Profile = (props: Props) => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>{router.query.profileId}</title>
      </Head>
      <Heading>Profile Page</Heading>
    </>
  );
};

export default Profile;
