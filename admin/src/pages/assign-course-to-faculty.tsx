import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Select,
  Stack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import {
  useAssignCourseToFacultyMutation,
  useCoursesByDeptSemesterQuery,
  useDepartmentsQuery,
  useFacultiesQuery,
  useSemestersByDepartmentAndSessionQuery,
  useSessionsQuery,
} from "../generated/graphql";

interface Props {}

const AssignCourseToFaculty = (props: Props) => {
  const [code, setCode] = useState();
  const [sessionId, setSessionId] = useState();
  const [semesterId, setSemesterId] = useState();
  const [assignFaculty, { loading }] = useAssignCourseToFacultyMutation();
  const { data: semesters } = useSemestersByDepartmentAndSessionQuery({
    variables: {
      code: code,
      sessionId: parseInt(sessionId),
    },
  });
  const { data: departmentsData } = useDepartmentsQuery();
  const { data: facultyData } = useFacultiesQuery();
  const { data: sessionData } = useSessionsQuery();
  const { data: courseData } = useCoursesByDeptSemesterQuery({
    variables: {
      departmentCode: code,
      semesterId: parseInt(semesterId),
    },
  });
  const router = useRouter();
  const { register, handleSubmit, control, setError, errors } = useForm();
  const dCode = useWatch({
    control,
    name: "departmentCode",
    defaultValue: undefined,
  });
  const semester = useWatch({
    control,
    name: "semesterId",
    defaultValue: undefined,
  });
  const session = useWatch({
    control,
    name: "sessionId",
    defaultValue: undefined,
  });

  useEffect(() => {
    setCode(dCode);
    setSessionId(session);
    setSemesterId(semester);
  }, [semester, session, dCode]);

  const onSubmit = async (data) => {
    const response = await assignFaculty({
      variables: {
        input: {
          semesterId: parseInt(data.semesterId),
          departmentCode: data.departmentCode,
          courseCode: data.courseCode,
          facultyId: parseInt(data.facultyId),
          sessionId: parseInt(data.sessionId),
        },
      },
    });

    if (response.data?.assignCourseToFaculty.errors) {
      response.data?.assignCourseToFaculty.errors.map((err) => {
        setError(err.field, {
          type: "manual",
          message: err.message,
        });
      });
    } else if (response.data?.assignCourseToFaculty.courseAssignToFaculty) {
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
            <FormControl id="facultyId" isInvalid={errors.facultyId}>
              <FormLabel htmlFor="facultyId">Faculty</FormLabel>
              <Controller
                as={
                  <Select placeholder="Select option">
                    {facultyData?.faculties?.map((f) => (
                      <option value={f.id} key={f.id}>
                        {f.username}
                      </option>
                    ))}
                  </Select>
                }
                control={control}
                name="facultyId"
                defaultValue={undefined}
              />
              <FormErrorMessage>{errors?.facultyId?.message}</FormErrorMessage>
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
            <FormControl id="sessionId" isInvalid={errors.session}>
              <FormLabel htmlFor="sessionId">Session</FormLabel>
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
                name="sessionId"
                defaultValue={0}
              />
              <FormErrorMessage>{errors?.session?.message}</FormErrorMessage>
            </FormControl>

            {dCode && session && (
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
            {dCode && semesterId && (
              <FormControl id="courseCode" isInvalid={errors.courseCode}>
                <FormLabel htmlFor="courseCode">Course</FormLabel>
                <Controller
                  as={
                    <Select placeholder="Select option">
                      {courseData?.coursesByDeptSemester?.map((c) => (
                        <option value={c.code} key={c.id}>
                          {c.name}
                        </option>
                      ))}
                    </Select>
                  }
                  control={control}
                  name="courseCode"
                  defaultValue=""
                />
                <FormErrorMessage>
                  {errors?.courseCode?.message}
                </FormErrorMessage>
              </FormControl>
            )}
            <Button
              w="100%"
              type="submit"
              isLoading={loading}
              colorScheme="purple"
            >
              Assign
            </Button>
          </Stack>
        </form>
      </Box>
    </Flex>
  );
};

export default AssignCourseToFaculty;
