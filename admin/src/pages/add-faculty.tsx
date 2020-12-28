import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { FormLayout } from "../components/FormLayout";
import { InputField } from "../components/InputField";
import { useAddFacultyMutation } from "../generated/graphql";

interface Props {}

const AddFaculty = (props: Props) => {
  const [addStudent, { loading }] = useAddFacultyMutation();
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
      router.push("/faculties");
    }
  };
  return (
    <Flex justify="center" align="center">
      <FormLayout>
        <Text textAlign="center" fontSize="xl" fontWeight="400" mb={6}>
          Add Faculty
        </Text>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={4}>
            <InputField
              ref={register}
              label="email"
              name="email"
              placeholder="email"
              type="text"
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
              label="Designation"
              name="designation"
              placeholder="designation"
              type="text"
              error={errors.designation}
            />
            <InputField
              ref={register}
              label="Contact Number"
              name="contactNumber"
              placeholder="contactNumber"
              type="text"
              error={errors.contactNumber}
            />
            <InputField
              ref={register}
              label="Address"
              name="address"
              placeholder="address"
              type="text"
              error={errors.address}
            />
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
