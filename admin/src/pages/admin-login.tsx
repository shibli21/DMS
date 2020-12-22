import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import { MeDocument, useAdminLoginMutation } from "../generated/graphql";

interface Props {}

const login = (props: Props) => {
  const [login, { loading }] = useAdminLoginMutation();
  const router = useRouter();
  const { register, handleSubmit, setError, errors } = useForm();
  const onSubmit = async (data) => {
    const response = await login({
      variables: {
        email: data.email,
        password: data.password,
      },
      refetchQueries: [
        {
          query: MeDocument,
        },
      ],
    });

    console.log(response);

    if (response.data?.adminLogin.errors) {
      response.data?.adminLogin.errors.map((err) => {
        setError(err.field, {
          type: "manual",
          message: err.message,
        });
      });
    } else if (response.data?.adminLogin.admin) {
      if (typeof router.query.next === "string") {
        router.push(router.query.next);
      } else {
        router.push("/");
      }
    }
  };

  return (
    <Flex justify="center" align="center">
      <Box
        w="400px"
        bg="gray.50"
        p={10}
        mt={10}
        pos="relative"
        _after={{
          pos: "absolute",
          content: `""`,
          h: "10px",
          w: "100%",
          bg: "purple.300",
          top: 0,
          left: 0,
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={4}>
            <FormControl id="email" isInvalid={errors.email}>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input
                type="email"
                name="email"
                defaultValue=""
                ref={register}
                placeholder="Email"
              />
              <FormErrorMessage>{errors?.email?.message}</FormErrorMessage>
            </FormControl>
            <FormControl id="password" isInvalid={errors.password}>
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input
                type="password"
                name="password"
                defaultValue=""
                ref={register}
                placeholder="password"
              />
              <FormErrorMessage>{errors?.password?.message}</FormErrorMessage>
            </FormControl>
            <Button
              w="100%"
              type="submit"
              isLoading={loading}
              colorScheme="purple"
            >
              Login
            </Button>
            <Center>
              <Link href="/admin-register">Don't have a account? Sign up</Link>
            </Center>
          </Stack>
        </form>
      </Box>
    </Flex>
  );
};

export default login;
