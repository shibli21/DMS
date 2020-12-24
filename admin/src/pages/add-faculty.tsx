import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  Select,
  Stack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { FormLayout } from "../components/FormLayout";
import {
  useAddFacultyMutation,
  useDepartmentsQuery,
  useSessionsQuery,
} from "../generated/graphql";

interface Props {}

const AddFaculty = (props: Props) => {
  const [addStudent, { loading }] = useAddFacultyMutation();
  const { data } = useSessionsQuery();
  const { data: departmentsData } = useDepartmentsQuery();
  const router = useRouter();
  const { register, handleSubmit, control, setError, errors } = useForm();
  const onSubmit = async (data) => {
    const response = await addStudent({
      variables: {
        input: {
          address: data.address,
          contactNumber: parseInt(data.contactNumber),
          email: data.email,
          gender: data.gender,
          username: data.username,
          designation: data.designation,
        },
      },
    });

    if (response.data?.addFaculty.errors) {
      response.data?.addFaculty.errors.map((err) => {
        setError(err.field, {
          type: "manual",
          message: err.message,
        });
      });
    } else if (response.data?.addFaculty.faculty) {
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
                placeholder="email"
              />
              <FormErrorMessage>{errors?.email?.message}</FormErrorMessage>
            </FormControl>
            <FormControl id="username" isInvalid={errors.username}>
              <FormLabel htmlFor="username">Name</FormLabel>
              <Input
                type="username"
                name="username"
                defaultValue=""
                ref={register}
                placeholder="name"
              />
              <FormErrorMessage>{errors?.username?.message}</FormErrorMessage>
            </FormControl>

            <FormControl id="designation" isInvalid={errors.designation}>
              <FormLabel htmlFor="designation">Designation</FormLabel>
              <Input
                type="designation"
                name="designation"
                defaultValue=""
                ref={register}
                placeholder="designation"
              />
              <FormErrorMessage>
                {errors?.designation?.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl id="contactNumber" isInvalid={errors.contactNumber}>
              <FormLabel htmlFor="contactNumber">Contact Number</FormLabel>
              <Input
                type="number"
                name="contactNumber"
                defaultValue={undefined}
                ref={register}
                placeholder="contact number"
              />
              <FormErrorMessage>
                {errors?.contactNumber?.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl id="address" isInvalid={errors.address}>
              <FormLabel htmlFor="address">Address</FormLabel>
              <Input
                type="text"
                name="address"
                defaultValue=""
                ref={register}
                placeholder="address"
              />
              <FormErrorMessage>{errors?.address?.message}</FormErrorMessage>
            </FormControl>
            <FormControl id="gender" isInvalid={errors.gender}>
              <FormLabel htmlFor="gender">Gender</FormLabel>
              <Controller
                as={
                  <RadioGroup defaultValue="male">
                    <Stack spacing={5} direction="row">
                      <Radio value="male">Male</Radio>
                      <Radio value="female">Female</Radio>
                    </Stack>
                  </RadioGroup>
                }
                control={control}
                name="gender"
                defaultValue="male"
              />
              <FormErrorMessage>{errors?.gender?.message}</FormErrorMessage>
            </FormControl>

            <Button
              w="100%"
              type="submit"
              isLoading={loading}
              colorScheme="purple"
            >
              Add Faculty
            </Button>
          </Stack>
        </form>
      </FormLayout>
    </Flex>
  );
};

export default AddFaculty;
