import {
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
import { FormLayout } from "../components/FormLayout";
import { MeDocument, useAdminRegisterMutation } from "../generated/graphql";

interface Props {}

const register = (props: Props) => {
  const [registerUser, { loading }] = useAdminRegisterMutation();
  const router = useRouter();
  const { register, handleSubmit, setError, errors } = useForm();
  const onSubmit = async (data) => {
    const response = await registerUser({
      variables: {
        input: {
          token: data.token,
          email: data.email,
          password: data.password,
          username: data.username,
        },
      },
      refetchQueries: [
        {
          query: MeDocument,
        },
      ],
    });
    if (response.data?.registerAdmin.errors) {
      response.data?.registerAdmin.errors.map((err) => {
        setError(err.field, {
          type: "manual",
          message: err.message,
        });
      });
    } else if (response.data?.registerAdmin.admin) {
      if (typeof router.query.next === "string") {
        router.push(router.query.next);
      } else {
        router.push("/");
      }
    }
  };
  return (
    <Flex justify="center" align="center">
      <FormLayout>
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
            <FormControl id="username" isInvalid={errors.username}>
              <FormLabel htmlFor="username">Name</FormLabel>
              <Input
                type="text"
                name="username"
                defaultValue=""
                ref={register}
                placeholder="username"
              />
              <FormErrorMessage>{errors?.username?.message}</FormErrorMessage>
            </FormControl>
            <FormControl id="token" isInvalid={errors.token}>
              <FormLabel htmlFor="token">Token</FormLabel>
              <Input
                type="token"
                name="token"
                defaultValue=""
                ref={register}
                placeholder="token"
              />
              <FormErrorMessage>{errors?.token?.message}</FormErrorMessage>
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
              Register
            </Button>
            <Center>
              <Link href="/admin-login">Already have a account? Sign in</Link>
            </Center>
          </Stack>
        </form>
      </FormLayout>
    </Flex>
  );
};

export default register;
