import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Alert,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Textarea,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { DateTime } from "luxon";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import { InputField } from "../../components/InputField";
import LoadingSpinner from "../../components/LoadingSpinner";
import {
  CourseNoticesDocument,
  useClassScheduleByAllQuery,
  useCourseNoticesQuery,
  useMeQuery,
  usePublishNoticeMutation,
} from "../../generated/graphql";
import { getDayName } from "../../utils/getDayName";
interface Props {}

const MyCourse = (props: Props) => {
  const { data: me, loading: meLoading } = useMeQuery();

  const router = useRouter();
  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { register, handleSubmit, control, setError, errors } = useForm();
  const dCode =
    typeof router.query.departmentCode === "string"
      ? router.query.departmentCode
      : -1;
  const cCode =
    typeof router.query.courseCode === "string" ? router.query.courseCode : -1;
  const semId =
    typeof router.query.semesterId === "string"
      ? parseInt(router.query.semesterId)
      : -1;
  const sesId =
    typeof router.query.sessionId === "string"
      ? parseInt(router.query.sessionId)
      : -1;

  const [
    publishNotice,
    { loading: publishLoading },
  ] = usePublishNoticeMutation();

  const { data, loading } = useCourseNoticesQuery({
    variables: {
      input: {
        courseCode: encodeURIComponent(cCode),
        departmentCode: encodeURIComponent(dCode),
        semesterId: semId,
        sessionId: sesId,
      },
    },
  });
  const {
    data: classSchedule,
    loading: classScheduleLoading,
  } = useClassScheduleByAllQuery({
    variables: {
      departmentCode: encodeURIComponent(dCode),
      semesterId: semId,
      courseCode: encodeURIComponent(cCode),
      sessionId: sesId,
    },
  });

  const onSubmit = async (data: { title: string; description: string }) => {
    const res = await publishNotice({
      variables: {
        input: {
          title: data.title,
          description: data.description,
          courseCode: encodeURIComponent(cCode),
          departmentCode: encodeURIComponent(dCode),
          semesterId: semId,
          sessionId: sesId,
        },
      },
      refetchQueries: [
        {
          query: CourseNoticesDocument,
          variables: {
            input: {
              courseCode: encodeURIComponent(cCode),
              departmentCode: encodeURIComponent(dCode),
              semesterId: semId,
              sessionId: sesId,
            },
          },
        },
      ],
    });
    if (res.data?.publishNotice.errors) {
      res.data?.publishNotice.errors.map((err) => {
        setError(err.field, {
          type: "manual",
          message: err.message,
        });
      });
    } else if (res.data?.publishNotice.notice) {
      onClose();
      toast({
        position: "bottom-right",
        description: "Notice publish successful",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  if (meLoading) {
    return <LoadingSpinner />;
  }

  if (!me?.me)
    return (
      <Container>
        <Alert status="error">
          <AlertIcon />
          <AlertTitle mr={2}>
            Access Denied !!! Please sign in to access
          </AlertTitle>
        </Alert>
      </Container>
    );

  return (
    <>
      <Head>
        <title>{router.query.courseCode}</title>
      </Head>
      <Text my={6} textAlign="center" fontSize="3xl">
        Class schedule
      </Text>

      <Table mb={20}>
        <Thead>
          <Tr>
            <Th>Day</Th>
            <Th>Start Time</Th>
            <Th>End Time</Th>
            <Th>Faculty</Th>
          </Tr>
        </Thead>
        <Tbody>
          {classSchedule?.classScheduleByAll.map((d) => (
            <Tr>
              <Td>
                <Text>{getDayName(d.day)}</Text>
              </Td>
              <Td>
                {DateTime.fromISO(d.startTime).toLocaleString(
                  DateTime.TIME_SIMPLE
                )}
              </Td>
              <Td>
                {DateTime.fromISO(d.endTime).toLocaleString(
                  DateTime.TIME_SIMPLE
                )}
              </Td>
              <Td>{d.faculty.username}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <HStack justify="space-between">
        <Text fontWeight="bold" fontSize="3xl" mb={6}>
          Notice
        </Text>
        {me?.me?.faculty === null ? (
          ""
        ) : (
          <Button
            onClick={() => {
              onOpen();
            }}
            colorScheme="purple"
          >
            Publish notice
          </Button>
        )}
      </HStack>
      {data?.courseNotice?.length > 0 ? (
        <Accordion allowToggle>
          {data?.courseNotice?.map((n) => (
            <AccordionItem key={n.id}>
              <Box>
                <HStack as={AccordionButton} justify="space-between">
                  <Box
                    textAlign="left"
                    textTransform="capitalize"
                    fontWeight="600"
                    fontSize="lg"
                  >
                    {n.title}
                  </Box>
                  <Box fontFamily="poppins">
                    {DateTime.fromMillis(parseInt(n.createdAt)).toLocaleString(
                      DateTime.DATE_MED
                    )}
                  </Box>
                </HStack>
                <AccordionPanel pb={4}>
                  <Box>{n.description}</Box>
                </AccordionPanel>
              </Box>
            </AccordionItem>
          ))}
        </Accordion>
      ) : (
        <Box>None</Box>
      )}
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create notice</ModalHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody pb={6}>
              <Stack spacing={4}>
                <InputField
                  ref={register}
                  label="Title"
                  name="title"
                  placeholder="Title"
                  type="title"
                  error={errors.title}
                />
                <FormControl id="description" isInvalid={errors.description}>
                  <FormLabel htmlFor="description">Description</FormLabel>
                  <Textarea
                    placeholder="Here is a sample notice"
                    ref={register}
                    name="description"
                  />
                  <FormErrorMessage>
                    {errors.description?.message}
                  </FormErrorMessage>
                </FormControl>
              </Stack>
            </ModalBody>

            <ModalFooter>
              <Button
                colorScheme="purple"
                mr={3}
                type="submit"
                isLoading={publishLoading}
              >
                Publish
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default MyCourse;
