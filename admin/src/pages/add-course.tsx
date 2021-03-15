import { Button, Flex, FormControl, FormErrorMessage, FormLabel, Select, Stack, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { FormLayout } from "../components/FormLayout";
import { InputField } from "../components/InputField";
import withPrivateRoute from "../components/withPrivateRoute";
import {
  useAddCourseMutation,
  useDepartmentsQuery,
  useSemestersByDepartmentAndSessionQuery,
  useSessionsQuery,
} from "../generated/graphql";

interface Props {}

const AddCourse = (props: Props) => {
  const [code, setCode] = useState();
  const [sessionId, setSessionId] = useState();
  const [addCourse, { loading }] = useAddCourseMutation();
  const { data: semesters } = useSemestersByDepartmentAndSessionQuery({
    variables: {
      code: code,
      sessionId: parseInt(sessionId),
    },
  });
  const { data: departmentsData } = useDepartmentsQuery();
  const { data: sessionData } = useSessionsQuery();
  const router = useRouter();
  const { register, handleSubmit, control, setError, errors } = useForm();
  const dCode = useWatch({
    control,
    name: "departmentCode",
    defaultValue: undefined,
  });
  const sId = useWatch({
    control,
    name: "session",
    defaultValue: undefined,
  });

  useEffect(() => {
    setCode(dCode);
    setSessionId(sId);
  }, [sId, dCode]);

  const onSubmit = async (data) => {
    const response = await addCourse({
      variables: {
        input: {
          name: data.name,
          code: data.code,
          credit: parseFloat(data.credit),
          semesterId: parseInt(data.semesterId),
          sessionId: parseInt(data.session),
          description: data.description,
          departmentCode: data.departmentCode,
        },
      },
    });

    if (response.data?.addCourse.errors) {
      response.data?.addCourse.errors.map((err) => {
        setError(err.field, {
          type: "manual",
          message: err.message,
        });
      });
    } else if (response.data?.addCourse.course) {
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
        <Text textAlign="center" fontSize="xl" fontWeight="400" mb={6}>
          Add Course
        </Text>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={4}>
            <InputField
              ref={register}
              label="Course Name"
              name="name"
              placeholder="course name"
              type="text"
              error={errors.name}
            />
            <InputField
              ref={register}
              label="Course code"
              name="code"
              placeholder="course code"
              type="text"
              error={errors.code}
            />

            <InputField
              ref={register}
              label="Course credit"
              name="credit"
              placeholder="course credit"
              type="number"
              error={errors.credit}
            />
            <InputField
              ref={register}
              label="Description"
              name="description"
              placeholder="description"
              type="text"
              error={errors.description}
            />
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
              <FormErrorMessage>{errors?.departmentCode?.message}</FormErrorMessage>
            </FormControl>
            <FormControl id="session" isInvalid={errors.session}>
              <FormLabel htmlFor="session">Session</FormLabel>
              <Controller
                as={
                  <Select placeholder="Select option">
                    {sessionData?.sessions?.map((s) => (
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
            {dCode && sId && (
              <FormControl id="semesterId" isInvalid={errors.semesterId}>
                <FormLabel htmlFor="semesterId">Semester</FormLabel>
                <Controller
                  as={
                    <Select placeholder="Select option">
                      {semesters?.semestersByDepartmentAndSession?.map((s) => (
                        <option value={s.number} key={s.id}>
                          {s.number}
                        </option>
                      ))}
                    </Select>
                  }
                  control={control}
                  name="semesterId"
                  defaultValue={undefined}
                />
                <FormErrorMessage>{errors?.semesterId?.message}</FormErrorMessage>
              </FormControl>
            )}
            <Button w="100%" type="submit" isLoading={loading} colorScheme="purple">
              Add Course
            </Button>
          </Stack>
        </form>
      </FormLayout>
    </Flex>
  );
};

export default withPrivateRoute(AddCourse);
