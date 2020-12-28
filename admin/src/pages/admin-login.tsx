import { Button, Center, Flex, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import { FormLayout } from "../components/FormLayout";
import { InputField } from "../components/InputField";
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

    if (response.data?.adminLogin.errors) {
      response.data?.adminLogin.errors.map((err) => {
        setError(err.field, {
          type: "manual",
          message: err.message,
        });
      });
    } else if (response.data?.adminLogin.admin) {
      router.push("/");
    }
  };

  return (
    <Flex justify="center" align="center">
      <FormLayout>
        <Text textAlign="center" fontSize="xl" fontWeight="400" mb={6}>
          Admin Login
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
              Login
            </Button>
            <Center>
              <Link href="/admin-register">
                Don't have a admin account? Sign up
              </Link>
            </Center>
          </Stack>
        </form>
      </FormLayout>
    </Flex>
  );
};

export default login;
