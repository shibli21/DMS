import { Button, Center, Flex, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import { FormLayout } from "../components/FormLayout";
import { InputField } from "../components/InputField";
import { MeDocument, useRegisterStudentMutation } from "../generated/graphql";

interface Props {}

const register = (props: Props) => {
  const [registerUser, { loading }] = useRegisterStudentMutation();
  const router = useRouter();
  const { register, handleSubmit, setError, errors } = useForm();
  const onSubmit = async (data) => {
    const response = await registerUser({
      variables: {
        input: {
          token: data.token,
          email: data.email,
          password: data.password,
        },
      },
      refetchQueries: [
        {
          query: MeDocument,
        },
      ],
    });
    if (response.data?.registerStudent.errors) {
      response.data?.registerStudent.errors.map((err) => {
        setError(err.field, {
          type: "manual",
          message: err.message,
        });
      });
    } else if (response.data?.registerStudent.student) {
      router.push("/");
    }
  };
  return (
    <Flex justify="center" align="center">
      <FormLayout>
        <Text textAlign="center" fontSize="xl" fontWeight="400" mb={6}>
          Register
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
              label="Token"
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
              <Link href="/login">Already have a account? Sign in</Link>
            </Center>
          </Stack>
        </form>
      </FormLayout>
    </Flex>
  );
};

export default register;
