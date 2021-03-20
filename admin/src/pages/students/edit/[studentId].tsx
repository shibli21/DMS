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
import { useRouter } from "next/router";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { FormLayout } from "../../../components/FormLayout";
import { InputField } from "../../../components/InputField";
import withPrivateRoute from "../../../components/withPrivateRoute";
import {
  useAddStudentMutation,
  useDepartmentsQuery,
  useEditStudentMutation,
  useSessionsQuery,
  useStudentQuery,
} from "../../../generated/graphql";

interface Props {}

const EditStudent = (props: Props) => {
  const router = useRouter();

  const id = typeof router.query.studentId === "string" ? parseInt(router.query.studentId) : -1;
  const toast = useToast();
  const { register, handleSubmit, control, setError, errors, reset } = useForm();
  const [editStudent, { loading }] = useEditStudentMutation();
  const { data } = useSessionsQuery();
  const { data: studentData } = useStudentQuery({
    variables: {
      id: id,
    },
  });
  console.log(studentData);

  const { data: departmentsData } = useDepartmentsQuery();
  const onSubmit = async (data) => {
    const response = await editStudent({
      variables: {
        input: {
          address: data.address,
          contactNumber: parseInt(data.contactNumber),
          email: data.email,
          gender: data.gender,
          registrationNumber: parseInt(data.registrationNumber),
          username: data.username,
          sessionId: parseInt(data.session),
          departmentCode: data.department,
        },
      },
    });

    if (response.data?.editStudent.errors) {
      response.data?.editStudent.errors.map((err) => {
        setError(err.field, {
          type: "manual",
          message: err.message,
        });
      });
    } else if (response.data?.editStudent.student) {
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
          Update Student
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
              defaultValue={studentData?.student?.email}
              inputProps={{ isDisabled: true }}
            />
            <InputField
              ref={register}
              label="Name"
              name="username"
              placeholder="username"
              type="text"
              defaultValue={studentData?.student?.username}
              error={errors.username}
            />
            <InputField
              defaultValue={studentData?.student?.department.name}
              ref={register}
              label="department"
              name="department"
              placeholder="department"
              type="text"
              error={errors.department}
            />
            <InputField
              defaultValue={studentData?.student?.session.name}
              ref={register}
              label="session"
              name="session"
              placeholder="session"
              type="text"
              error={errors.session}
            />

            <InputField
              ref={register}
              defaultValue={studentData?.student?.registrationNumber}
              label="Registration Number"
              name="registrationNumber"
              placeholder="registrationNumber"
              type="text"
              error={errors.registrationNumber}
            />
            <InputField
              ref={register}
              defaultValue={studentData?.student?.contactNumber}
              label="Contact Number"
              name="contactNumber"
              placeholder="contactNumber"
              type="text"
              error={errors.contactNumber}
            />
            <InputField
              defaultValue={studentData?.student?.address}
              ref={register}
              label="Address"
              name="address"
              placeholder="address"
              type="text"
              error={errors.address}
            />
            <InputField
              defaultValue={studentData?.student?.gender}
              ref={register}
              label="gender"
              name="gender"
              placeholder="gender"
              type="text"
              error={errors.gender}
            />

            <Button w="100%" type="submit" isLoading={loading} colorScheme="purple">
              Update Student
            </Button>
          </Stack>
        </form>
      </FormLayout>
    </Flex>
  );
};

export default withPrivateRoute(EditStudent);
