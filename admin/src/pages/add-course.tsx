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
import React, { useEffect, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import {
  useAddCourseMutation,
  useDepartmentsQuery,
  useSemestersByDepartmentAndSessionLazyQuery,
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
            <FormControl id="name" isInvalid={errors.name}>
              <FormLabel htmlFor="name">Course Name</FormLabel>
              <Input
                type="text"
                name="name"
                defaultValue=""
                ref={register}
                placeholder="course name"
              />
              <FormErrorMessage>{errors?.name?.message}</FormErrorMessage>
            </FormControl>
            <FormControl id="code" isInvalid={errors.code}>
              <FormLabel htmlFor="code">Course code</FormLabel>
              <Input
                type="text"
                name="code"
                defaultValue=""
                ref={register}
                placeholder="course code"
              />
              <FormErrorMessage>{errors?.code?.message}</FormErrorMessage>
            </FormControl>

            <FormControl id="credit" isInvalid={errors.credit}>
              <FormLabel htmlFor="credit">Course credit</FormLabel>
              <Input
                type="number"
                name="credit"
                defaultValue={undefined}
                ref={register}
                placeholder="course credit"
              />
              <FormErrorMessage>{errors?.credit?.message}</FormErrorMessage>
            </FormControl>
            <FormControl id="description" isInvalid={errors.description}>
              <FormLabel htmlFor="description">Description</FormLabel>
              <Input
                type="text"
                name="description"
                defaultValue=""
                ref={register}
                placeholder="course description"
              />
              <FormErrorMessage>
                {errors?.description?.message}
              </FormErrorMessage>
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
                <FormErrorMessage>
                  {errors?.semesterId?.message}
                </FormErrorMessage>
              </FormControl>
            )}
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
      </Box>
    </Flex>
  );
};

export default AddCourse;
