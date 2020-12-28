import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Select,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Controller, useFieldArray, useForm, useWatch } from "react-hook-form";
import { FormLayout } from "../components/FormLayout";
import { InputField } from "../components/InputField";
import {
  useAddClassScheduleMutation,
  useCoursesByDeptSemesterQuery,
  useDepartmentsQuery,
  useFacultiesQuery,
  useSemestersByDepartmentAndSessionQuery,
  useSessionsQuery,
} from "../generated/graphql";

interface Props {}

const AddClassSchedule = (props: Props) => {
  const [code, setCode] = useState();
  const [sessionId, setSessionId] = useState();
  const [semesterId, setSemesterId] = useState();
  const [sessionName, setSessionName] = useState("");
  const [assignClass, { loading }] = useAddClassScheduleMutation();
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

  const { fields, append, remove } = useFieldArray({
    control,
    name: "classes",
  });
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
  const courseCode = useWatch({
    control,
    name: "courseCode",
    defaultValue: undefined,
  });

  useEffect(() => {
    setCode(dCode);
    setSessionId(session);
    setSemesterId(semester);
  }, [semester, session, dCode]);

  const onSubmit = async (data) => {
    console.log(data);

    const response = await assignClass({
      variables: {
        input: {
          semesterId: parseInt(data.semesterId),
          departmentCode: data.departmentCode,
          courseCode: data.courseCode,
          facultyId: parseInt(data.facultyId),
          sessionId: parseInt(data.sessionId),
          classes: data.classes,
        },
      },
    });

    if (response.data?.addClassSchedule.errors) {
      response.data?.addClassSchedule.errors.map((err) => {
        setError(err.field, {
          type: "manual",
          message: err.message,
        });
      });
    } else if (response.data?.addClassSchedule.classSchedule) {
      router.push(
        `/class-schedule/${dCode}/${sessionId}/${semesterId}}/${courseCode}?sessionName=${sessionName}`
      );
    }
  };
  return (
    <Flex justify="center" align="center">
      <FormLayout w="800px">
        <Text textAlign="center" fontSize="xl" fontWeight="400" mb={6}>
          Add Class Schedule
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
              <FormErrorMessage>
                {errors?.departmentCode?.message}
              </FormErrorMessage>
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
                defaultValue={undefined}
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
            {fields.map((item, index) => (
              <HStack key={item.id} align="flex-end">
                <FormControl id="day" isInvalid={errors.day}>
                  <FormLabel htmlFor="day">Day</FormLabel>
                  <Controller
                    as={
                      <Select placeholder="Select day">
                        <option value={1}>Saturday</option>
                        <option value={2}>Sunday</option>
                        <option value={3}>Monday</option>
                        <option value={4}>Tuesday</option>
                        <option value={5}>Wednesday</option>
                        <option value={6}>Thursday</option>
                        <option value={7}>Friday</option>
                      </Select>
                    }
                    control={control}
                    name={`classes[${index}].day`}
                    defaultValue={undefined}
                  />
                  <FormErrorMessage>{errors?.day?.message}</FormErrorMessage>
                </FormControl>

                <InputField
                  ref={register()}
                  label="Start Time"
                  name={`classes[${index}].startTime`}
                  placeholder="startTime"
                  type="time"
                  error={errors.startTime}
                />
                <InputField
                  ref={register()}
                  label="End Time"
                  name={`classes[${index}].endTime`}
                  placeholder="endTime"
                  type="time"
                  error={errors.endTime}
                />

                <Button
                  w="140px"
                  type="button"
                  variant="outline"
                  colorScheme="red"
                  onClick={() => remove(index)}
                >
                  Delete
                </Button>
              </HStack>
            ))}
            <Button
              type="button"
              onClick={() =>
                append({ firstName: "", startTime: "", endTime: "" })
              }
            >
              Add Class Schedule Filed
            </Button>
            <Button
              w="100%"
              type="submit"
              isLoading={loading}
              colorScheme="purple"
            >
              Add classes
            </Button>
          </Stack>
        </form>
      </FormLayout>
    </Flex>
  );
};

export default AddClassSchedule;
