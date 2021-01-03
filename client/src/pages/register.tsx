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
  useRegisterFacultyMutation,
  useRegisterStudentMutation,
} from "../generated/graphql";

interface Props {}

const register = (props: Props) => {
  const [registerAs, setRegisterAs] = useState<number>();

  const [
    registerStudent,
    { loading: studentLoading },
  ] = useRegisterStudentMutation();
  const [
    registerFaculty,
    { loading: facultyLoading },
  ] = useRegisterFacultyMutation();
  const router = useRouter();
  const { register, control, handleSubmit, setError, errors } = useForm();
  const loginCode = useWatch({
    control,
    name: "registerAs",
    defaultValue: 1,
  });

  useEffect(() => {
    setRegisterAs(loginCode);
  }, [loginCode]);

  const onSubmit = async (data) => {
    if (registerAs === 1) {
      const response = await registerStudent({
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
    } else {
      const response = await registerFaculty({
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
      if (response.data?.registerFaculty.errors) {
        response.data?.registerFaculty.errors.map((err) => {
          setError(err.field, {
            type: "manual",
            message: err.message,
          });
        });
      } else if (response.data?.registerFaculty.faculty) {
        router.push("/");
      }
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
            <FormControl id="registerAs" isInvalid={errors.registerAs}>
              <FormLabel htmlFor="registerAs">Login as</FormLabel>
              <Controller
                as={
                  <Select>
                    <option value={1}>Student</option>
                    <option value={2}>Faculty</option>
                  </Select>
                }
                control={control}
                name="registerAs"
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
              isLoading={facultyLoading || studentLoading}
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
