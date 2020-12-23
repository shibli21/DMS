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
import {
  useAddStudentMutation,
  useDepartmentsQuery,
  useSessionsQuery,
} from "../generated/graphql";

interface Props {}

const AddStudent = (props: Props) => {
  const [addStudent, { loading }] = useAddStudentMutation();
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
          registrationNumber: parseInt(data.registrationNumber),
          username: data.username,
          sessionId: parseInt(data.session),
          departmentCode: data.departmentCode,
        },
      },
    });
    console.log(response);

    if (response.data?.addStudent.errors) {
      response.data?.addStudent.errors.map((err) => {
        setError(err.field, {
          type: "manual",
          message: err.message,
        });
      });
    } else if (response.data?.addStudent.student) {
      if (typeof router.query.next === "string") {
        router.push(router.query.next);
      } else {
        router.push("/");
      }
    }
  };
  return (
    <Flex justify="center" align="center">
      <Box
        w="400px"
        bg="gray.50"
        mt={10}
        p={10}
        pos="relative"
        _after={{
          pos: "absolute",
          content: `""`,
          h: "10px",
          w: "100%",
          bg: "purple.300",
          top: 0,
          left: 0,
        }}
      >
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
            <FormControl
              id="registrationNumber"
              isInvalid={errors.registrationNumber}
            >
              <FormLabel htmlFor="registrationNumber">
                Registration Number
              </FormLabel>
              <Input
                type="number"
                name="registrationNumber"
                defaultValue={undefined}
                ref={register}
                placeholder="registration number"
              />
              <FormErrorMessage>
                {errors?.registrationNumber?.message}
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
      </Box>
    </Flex>
  );
};

export default AddStudent;
