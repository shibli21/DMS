import { Button, Flex, Stack, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import { FormLayout } from "../components/FormLayout";
import { InputField } from "../components/InputField";
import withPrivateRoute from "../components/withPrivateRoute";
import { useAddSessionMutation } from "../generated/graphql";

interface Props {}

const AddSession = (props: Props) => {
  const [addSession, { loading }] = useAddSessionMutation();
  const router = useRouter();
  const { register, handleSubmit, setError, errors } = useForm();
  const onSubmit = async (data) => {
    const response = await addSession({
      variables: {
        input: {
          name: data.name,
          startTime: data.startTime,
          endTime: data.endTime,
        },
      },
    });
    if (response.data?.addSession.errors) {
      response.data?.addSession.errors.map((err) => {
        setError(err.field, {
          type: "manual",
          message: err.message,
        });
      });
    } else if (response.data?.addSession.session) {
      router.push("/sessions");
    }
  };
  return (
    <Flex justify="center" align="center">
      <FormLayout>
        <Text textAlign="center" fontSize="xl" fontWeight="400" mb={6}>
          Add Session
        </Text>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={4}>
            <InputField
              type="text"
              name="name"
              error={errors.name}
              label="Session Name"
              ref={register}
              placeholder="name"
            />
            <InputField
              ref={register}
              label="Start Time"
              name="startTime"
              placeholder="startTime"
              type="date"
              error={errors.startTime}
            />
            <InputField
              ref={register}
              label="End Time"
              name="endTime"
              placeholder="endTime"
              type="date"
              error={errors.endTime}
            />
            <Button
              w="100%"
              type="submit"
              isLoading={loading}
              colorScheme="purple"
            >
              Add Session
            </Button>
          </Stack>
        </form>
      </FormLayout>
    </Flex>
  );
};

export default withPrivateRoute(AddSession);
