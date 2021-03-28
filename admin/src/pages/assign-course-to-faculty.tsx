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
import React, { useEffect, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { FormLayout } from "../components/FormLayout";
import withPrivateRoute from "../components/withPrivateRoute";
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
  const toast = useToast();
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
        if (err.field === "courseAssignToFacultyExists") {
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
    } else if (response.data?.assignCourseToFaculty.courseAssignToFaculty) {
      toast({
        position: "bottom-right",
        description: "Assign Successful",
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
          Assign Course To Faculty
        </Text>
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
              <FormErrorMessage>{errors?.departmentCode?.message}</FormErrorMessage>
            </FormControl>
            <FormControl id="sessionId" isInvalid={errors.sessionId}>
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
              <FormErrorMessage>{errors?.sessionId?.message}</FormErrorMessage>
            </FormControl>

            {dCode && session && (
              <FormControl id="semesterId" isInvalid={errors.semesterId}>
                <FormLabel htmlFor="semesterId">Semester</FormLabel>
                <Controller
                  as={
                    <Select placeholder="Select option">
                      {semesters?.semestersByDepartmentAndSession?.map((s) => (
                        <option value={s.id} key={s.id}>
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
                <FormErrorMessage>{errors?.courseCode?.message}</FormErrorMessage>
              </FormControl>
            )}
            <Button w="100%" type="submit" isLoading={loading} colorScheme="purple">
              Assign
            </Button>
          </Stack>
        </form>
      </FormLayout>
    </Flex>
  );
};

export default withPrivateRoute(AssignCourseToFaculty);
