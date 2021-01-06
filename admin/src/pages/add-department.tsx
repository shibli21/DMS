import { Button, Flex, Stack, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import { FormLayout } from "../components/FormLayout";
import { InputField } from "../components/InputField";
import withPrivateRoute from "../components/withPrivateRoute";
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
      router.push("/departments");
    }
  };
  return (
    <Flex justify="center" align="center">
      <FormLayout>
        <Text textAlign="center" fontSize="xl" fontWeight="400" mb={6}>
          Add Department
        </Text>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={4}>
            <InputField
              ref={register}
              label="Name"
              name="name"
              placeholder="name"
              type="text"
              error={errors.name}
            />
            <InputField
              ref={register}
              label="Department Code"
              name="code"
              placeholder="code"
              type="text"
              error={errors.code}
            />
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

export default withPrivateRoute(AddDepartment);
