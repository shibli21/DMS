import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Select,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { FormLayout } from "../components/FormLayout";
import { InputField } from "../components/InputField";
import withPrivateRoute from "../components/withPrivateRoute";
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
  const toast = useToast();
  const onSubmit = async (data) => {
    const response = await addSemester({
      variables: {
        input: {
          sessionId: parseInt(data.sessionId),
          departmentCode: data.departmentCode,
          startTime: data.startTime,
          endTime: data.endTime,
          number: parseInt(data.number),
        },
      },
    });

    if (response.data?.addSemester.errors) {
      response.data?.addSemester.errors.map((err) => {
        if (err.field === "semesterExists") {
          toast({
            position: "bottom-right",
            description: err.message,
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        } else {
          setError(err.field, {
            type: "manual",
            message: err.message,
          });
        }
      });
    } else if (response.data?.addSemester.semester) {
      toast({
        position: "bottom-right",
        description: "Semester successful added",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    }
  };
  return (
    <Flex justify="center" align="center">
      <FormLayout>
        <Text textAlign="center" fontSize="xl" fontWeight="400" mb={6}>
          Add Semester
        </Text>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={4}>
            <InputField
              ref={register}
              label="Semester Number"
              name="number"
              placeholder="number"
              type="number"
              error={errors.number}
            />
            <FormControl id="sessionId" isInvalid={errors.sessionId}>
              <FormLabel htmlFor="sessionId">Session</FormLabel>
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
                name="sessionId"
                defaultValue={0}
              />
              <FormErrorMessage>{errors?.sessionId?.message}</FormErrorMessage>
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
              Add Semester
            </Button>
          </Stack>
        </form>
      </FormLayout>
    </Flex>
  );
};

export default withPrivateRoute(AddSession);
