import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  Stack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { FormLayout } from "../components/FormLayout";
import {
  useAddSemesterMutation,
  useDepartmentsQuery,
  useSessionsQuery,
} from "../generated/graphql";

interface Props {}

const AddSession = (props: Props) => {
  const [addSemester, { loading }] = useAddSemesterMutation();
  const { data } = useSessionsQuery();
  const { data: departmentsData } = useDepartmentsQuery();
  const router = useRouter();
  const { register, handleSubmit, control, setError, errors } = useForm();
  const onSubmit = async (data) => {
    const response = await addSemester({
      variables: {
        input: {
          sessionId: parseInt(data.session),
          departmentCode: data.departmentCode,
          startTime: data.startTime,
          endTime: data.endTime,
          number: parseInt(data.number),
        },
      },
    });
    console.log(response);

    if (response.data?.addSemester.errors) {
      response.data?.addSemester.errors.map((err) => {
        setError(err.field, {
          type: "manual",
          message: err.message,
        });
      });
    } else if (response.data?.addSemester.semester) {
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
            <FormControl id="number" isInvalid={errors.number}>
              <FormLabel htmlFor="number">Semester Number</FormLabel>
              <Input
                type="number"
                name="number"
                defaultValue={0}
                ref={register}
                placeholder="semester number"
              />
              <FormErrorMessage>{errors?.number?.message}</FormErrorMessage>
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
                defaultValue="ASDA"
              />
              <FormErrorMessage>
                {errors?.departmentCode?.message}
              </FormErrorMessage>
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
              Add Semester
            </Button>
          </Stack>
        </form>
      </FormLayout>
    </Flex>
  );
};

export default AddSession;
