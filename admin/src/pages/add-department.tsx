import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import { FormLayout } from "../components/FormLayout";
import { useAddDepartmentMutation } from "../generated/graphql";

interface Props {}

const AddDepartment = (props: Props) => {
  const [addDepartment, { loading }] = useAddDepartmentMutation();
  const router = useRouter();
  const { register, handleSubmit, setError, errors } = useForm();
  const onSubmit = async (data) => {
    const response = await addDepartment({
      variables: {
        name: data.name,
        code: data.code,
      },
    });
    if (response.data?.addDepartment.errors) {
      response.data?.addDepartment.errors.map((err) => {
        setError(err.field, {
          type: "manual",
          message: err.message,
        });
      });
    } else if (response.data?.addDepartment.department) {
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
            <FormControl id="name" isInvalid={errors.name}>
              <FormLabel htmlFor="name">Name</FormLabel>
              <Input
                type="text"
                name="name"
                defaultValue=""
                ref={register}
                placeholder="name"
              />
              <FormErrorMessage>{errors?.name?.message}</FormErrorMessage>
            </FormControl>
            <FormControl id="code" isInvalid={errors.code}>
              <FormLabel htmlFor="code">Department Code</FormLabel>
              <Input
                type="text"
                name="code"
                defaultValue=""
                ref={register}
                placeholder="code"
              />
              <FormErrorMessage>{errors?.code?.message}</FormErrorMessage>
            </FormControl>
            <Button
              w="100%"
              type="submit"
              isLoading={loading}
              colorScheme="purple"
            >
              Add Department
            </Button>
          </Stack>
        </form>
      </FormLayout>
    </Flex>
  );
};

export default AddDepartment;
