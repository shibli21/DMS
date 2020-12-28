import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { FormLayout } from "../components/FormLayout";
import { InputField } from "../components/InputField";
import {
  useAddStudentMutation,
  useDepartmentsQuery,
  useSessionsQuery,
} from "../generated/graphql";

interface Props {}

const AddStudent = (props: Props) => {
  const toast = useToast();
  const {
    register,
    handleSubmit,
    control,
    setError,
    errors,
    reset,
  } = useForm();
  const [addStudent, { loading }] = useAddStudentMutation();
  const { data } = useSessionsQuery();
  const { data: departmentsData } = useDepartmentsQuery();
  const onSubmit = async (data) => {
    const response = await addStudent({
      variables: {
        input: {
          address: data.address,
          contactNumber: parseInt(data.contactNumber),
          email: data.email,
          gender: data.gender,
          registrationNumber: parseInt(data.registrationNumber),
          username: data.username,
          sessionId: parseInt(data.session),
          departmentCode: data.departmentCode,
        },
      },
    });

    if (response.data?.addStudent.errors) {
      response.data?.addStudent.errors.map((err) => {
        setError(err.field, {
          type: "manual",
          message: err.message,
        });
      });
    } else if (response.data?.addStudent.student) {
      toast({
        position: "bottom-right",
        description: "Student register successful",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      reset();
    }
  };
  return (
    <Flex justify="center" align="center">
      <FormLayout>
        <Text textAlign="center" fontSize="xl" fontWeight="400" mb={6}>
          Add Student
        </Text>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={4}>
            <InputField
              ref={register}
              label="Email"
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
              label="Registration Number"
              name="registrationNumber"
              placeholder="registrationNumber"
              type="text"
              error={errors.registrationNumber}
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
            <FormControl id="session" isInvalid={errors.session}>
              <FormLabel htmlFor="session">Session</FormLabel>
              <Controller
                as={
                  <Select placeholder="Select option">
                    {data?.sessions?.map((s) => (
                      <option value={s.id} key={s.id}>
                        {s.name}
                      </option>
                    ))}
                  </Select>
                }
                control={control}
                name="session"
                defaultValue={0}
              />
              <FormErrorMessage>{errors?.session?.message}</FormErrorMessage>
            </FormControl>
            <FormControl id="departmentCode" isInvalid={errors.departmentCode}>
              <FormLabel htmlFor="departmentCode">Department</FormLabel>
              <Controller
                as={
                  <Select placeholder="Select option">
                    {departmentsData?.departments?.map((s) => (
                      <option value={s.departmentCode} key={s.id}>
                        {s.name}
                      </option>
                    ))}
                  </Select>
                }
                control={control}
                name="departmentCode"
                defaultValue={undefined}
              />
              <FormErrorMessage>
                {errors?.departmentCode?.message}
              </FormErrorMessage>
            </FormControl>
            <Button
              w="100%"
              type="submit"
              isLoading={loading}
              colorScheme="purple"
            >
              Add Student
            </Button>
          </Stack>
        </form>
      </FormLayout>
    </Flex>
  );
};

export default AddStudent;
