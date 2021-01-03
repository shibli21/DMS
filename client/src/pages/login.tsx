import {
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Select,
  Stack,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { FormLayout } from "../components/FormLayout";
import { InputField } from "../components/InputField";
import {
  MeDocument,
  useFacultyLoginMutation,
  useStudentLoginMutation,
} from "../generated/graphql";

interface Props {}

const login = (props: Props) => {
  const [loginAs, setLoginAs] = useState<number>();

  const [studentLogin, { loading: studentLoading }] = useStudentLoginMutation();
  const [facultyLogin, { loading: facultyLoading }] = useFacultyLoginMutation();
  const router = useRouter();

  const { register, handleSubmit, setError, errors, control } = useForm();
  const loginCode = useWatch({
    control,
    name: "loginAs",
    defaultValue: 1,
  });

  useEffect(() => {
    setLoginAs(loginCode);
  }, [loginCode]);

  const onSubmit = async (data) => {
    if (loginAs === 1) {
      const response = await studentLogin({
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

      if (response.data?.studentLogin.errors) {
        response.data?.studentLogin.errors.map((err) => {
          setError(err.field, {
            type: "manual",
            message: err.message,
          });
        });
      } else if (response.data?.studentLogin.student) {
        router.push("/");
      }
    } else {
      const response = await facultyLogin({
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

      if (response.data?.facultyLogin.errors) {
        response.data?.facultyLogin.errors.map((err) => {
          setError(err.field, {
            type: "manual",
            message: err.message,
          });
        });
      } else if (response.data?.facultyLogin.faculty) {
        router.push("/");
      }
    }
  };

  return (
    <Flex justify="center" align="center">
      <FormLayout>
        <Text textAlign="center" fontSize="xl" fontWeight="400" mb={6}>
          Login
        </Text>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={4}>
            <FormControl id="loginAs" isInvalid={errors.loginAs}>
              <FormLabel htmlFor="loginAs">Login as</FormLabel>
              <Controller
                as={
                  <Select>
                    <option value={1}>Student</option>
                    <option value={2}>Faculty</option>
                  </Select>
                }
                control={control}
                name="loginAs"
                defaultValue={1}
              />
            </FormControl>

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
              isLoading={studentLoading || facultyLoading}
              colorScheme="purple"
            >
              Login
            </Button>
            <Center>
              <Link href="/register">
                Don't have a student account? Sign up
              </Link>
            </Center>
          </Stack>
        </form>
      </FormLayout>
    </Flex>
  );
};

export default login;
