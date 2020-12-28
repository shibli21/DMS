import { Button, Center, Flex, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import { FormLayout } from "../components/FormLayout";
import { InputField } from "../components/InputField";
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
      router.push("/");
    }
  };
  return (
    <Flex justify="center" align="center">
      <FormLayout>
        <Text textAlign="center" fontSize="xl" fontWeight="400" mb={6}>
          Admin Register
        </Text>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={4}>
            <InputField
              ref={register}
              label="Email"
              name="email"
              placeholder="email"
              type="email"
              error={errors.email}
            />
            <InputField
              ref={register}
              label="Name"
              name="username"
              placeholder="username"
              type="text"
              error={errors.username}
            />
            <InputField
              ref={register}
              label="token"
              name="token"
              placeholder="token"
              type="password"
              error={errors.token}
            />
            <InputField
              ref={register}
              label="Password"
              name="password"
              placeholder="password"
              type="password"
              error={errors.password}
            />
            <Button
              w="100%"
              type="submit"
              isLoading={loading}
              colorScheme="purple"
            >
              Register
            </Button>
            <Center>
              <Link href="/admin-login">
                Already have a admin account? Sign in
              </Link>
            </Center>
          </Stack>
        </form>
      </FormLayout>
    </Flex>
  );
};

export default register;
