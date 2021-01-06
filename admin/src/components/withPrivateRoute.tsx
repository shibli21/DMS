import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Center,
  Container,
  Spinner,
} from "@chakra-ui/react";
import Link from "next/link";
import Router from "next/router";
import React from "react";
import { useMeQuery } from "../generated/graphql";

function withPrivateRoute(Component) {
  return function WithAuthComponent() {
    const { data: me, loading: meLoading } = useMeQuery();
    if (meLoading) {
      return (
        <Container centerContent h="100vh" justifyContent="center">
          <Spinner />
        </Container>
      );
    }

    if (!me?.me?.admin) {
      return (
        <Container centerContent h="90vh" justifyContent="center">
          <Alert
            status="error"
            variant="subtle"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            height="200px"
          >
            <AlertIcon boxSize="40px" mr={0} />
            <AlertTitle mt={4} mb={1} fontSize="lg">
              You are not authenticated!!
            </AlertTitle>
            <AlertDescription maxWidth="sm" display="flex" flexDir="column">
              <Link href="/admin-register">
                Don't have a admin account? Sign up
              </Link>
              <Link href="/admin-login">
                Already have a admin account? Sign in
              </Link>
            </AlertDescription>
          </Alert>
        </Container>
      );
      //   return null;
    }

    return <Component />;
  };
}
export default withPrivateRoute;
