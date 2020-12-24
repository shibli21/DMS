import {
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
              <FormLabel htmlFor="name">Session Name</FormLabel>
              <Input
                type="text"
                name="name"
                defaultValue=""
                ref={register}
                placeholder="name"
              />
              <FormErrorMessage>{errors?.name?.message}</FormErrorMessage>
            </FormControl>
            <FormControl id="startTime" isInvalid={errors.startTime}>
              <FormLabel htmlFor="startTime">Start time</FormLabel>
              <Input
                type="date"
                name="startTime"
                defaultValue=""
                ref={register}
                placeholder="startTime"
              />
              <FormErrorMessage>{errors?.startTime?.message}</FormErrorMessage>
            </FormControl>
            <FormControl id="endTime" isInvalid={errors.endTime}>
              <FormLabel htmlFor="endTime">End time</FormLabel>
              <Input
                type="date"
                name="endTime"
                defaultValue=""
                ref={register}
                placeholder="endTime"
              />
              <FormErrorMessage>{errors?.endTime?.message}</FormErrorMessage>
            </FormControl>

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

export default AddSession;
