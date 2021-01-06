import {
  Badge,
  Box,
  Center,
  Container,
  Divider,
  Flex,
  HStack,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import LoadingSpinner from "../../components/LoadingSpinner";
import { useMeQuery } from "../../generated/graphql";
interface Props {}

const Profile = (props: Props) => {
  const router = useRouter();
  const { data: me, loading: meLoading } = useMeQuery();

  if (meLoading) {
    return <LoadingSpinner />;
  }
  if (!me?.me?.faculty && !me?.me?.student) {
    router.push("/login");
  }
  return (
    <>
      <Head>
        <title>{me?.me?.faculty?.username || me?.me?.student?.username}</title>
      </Head>
      <Container maxW="3xl">
        <Box w="100%" boxShadow="md" borderColor="purple.50" overflow="hidden">
          <Flex
            p={5}
            mb={6}
            bgGradient="linear(to bottom right,purple.400,purple.600)"
          >
            <Image
              border="2px solid"
              borderColor="white"
              width="100%"
              boxSize="120px"
              mr={5}
              src="https://bit.ly/sage-adebayo"
              alt="Segun Adebayo"
              objectFit="cover"
            />
            <Box>
              <Text fontSize="4xl" fontWeight="500">
                {me?.me?.student?.username || me?.me?.faculty?.username}
              </Text>

              {me?.me?.student ? (
                <Badge fontWeight="bold" fontSize="md" colorScheme="purple">
                  Student
                </Badge>
              ) : (
                ""
              )}
              {me?.me?.faculty ? (
                <Badge fontWeight="bold" fontSize="md" colorScheme="purple">
                  Faculty
                </Badge>
              ) : (
                ""
              )}
            </Box>
          </Flex>

          <Center w="100%" maxW="3xl">
            <Stack spacing={2}>
              <Divider height="1px" bg="gray.500" />
              <Box w="100%" p="4" maxW="xl" letterSpacing="1px" mb="5px">
                <Text fontSize="xl" mb="10px" fontWeight="bold">
                  Basic Info
                </Text>
                <Box>
                  <HStack>
                    <Text fontWeight="semibold">Email :</Text>
                    <Text>
                      {me?.me?.student?.email || me?.me?.faculty?.email}
                    </Text>
                  </HStack>
                  {me?.me?.faculty ? (
                    <HStack>
                      <Text fontWeight="semibold">Designation :</Text>
                      <Text fontFamily="poppins">
                        {me?.me?.faculty?.designation}
                      </Text>
                    </HStack>
                  ) : (
                    ""
                  )}
                  {me?.me?.student?.registrationNumber ? (
                    <HStack>
                      <Text fontWeight="semibold">Registration No :</Text>
                      <Text fontFamily="poppins">
                        {me?.me?.student?.registrationNumber}
                      </Text>
                    </HStack>
                  ) : (
                    ""
                  )}
                  {me?.me?.student?.department ? (
                    <HStack>
                      <Text fontWeight="semibold">Department Name :</Text>
                      <Text>{me?.me?.student?.department?.name}</Text>
                    </HStack>
                  ) : (
                    ""
                  )}

                  {me?.me?.student?.session ? (
                    <HStack>
                      <Text fontWeight="semibold">Session :</Text>
                      <Text fontFamily="poppins">
                        {me?.me?.student.session.name}
                      </Text>
                    </HStack>
                  ) : (
                    ""
                  )}
                  <HStack>
                    <Text fontWeight="semibold">Gender :</Text>
                    <Text>
                      {me?.me?.student?.gender || me?.me?.faculty?.gender}
                    </Text>
                  </HStack>
                </Box>
                <Box>
                  <Text fontSize="xl" my="10px" fontWeight="bold">
                    Contact Info
                  </Text>
                  <HStack>
                    <Text fontWeight="semibold">Address :</Text>
                    <Text fontFamily="poppins">
                      {me?.me?.student?.address || me?.me?.faculty?.address}
                    </Text>
                  </HStack>
                  <HStack>
                    <Text fontWeight="semibold">Contact No :</Text>
                    <Text fontFamily="poppins">
                      {me?.me?.student?.contactNumber ||
                        me?.me?.faculty?.contactNumber}
                    </Text>
                  </HStack>
                </Box>
              </Box>
            </Stack>
          </Center>
        </Box>
      </Container>
    </>
  );
};

export default Profile;
