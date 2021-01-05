import {Badge,Link,Button,Image,Flex,Text,Stack,VStack,HStack,Container, Heading,Box,Center } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
interface Props {}

const Profile = (props: Props) => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>{router.query.profileId}</title>
      </Head>
      <Heading>Profile Page</Heading>
      <Container maxW="3xl" centerContent>
  <Box padding="4" w="100%" float="left" maxW="3xl" borderRadius="12px" bg="" border="1px groove" borderColor="purple.50">
  <Badge as="h1" textTransform="capitalize"  borderRightRadius="50px" px="4" bg="purple.400" w="50%" h="50%" fontSize="22pt" mb="6%">
            Your Profile
          </Badge>


  <Flex objectPosition="center" mb="3%" display="flex" justifyContent="center" alignItems="center">
      <Image
      border="3px solid #fff"
  width="100%"
  boxSize="120px"
  mt="2%"
  mr="5%"
  src="https://bit.ly/sage-adebayo"
  alt="Segun Adebayo"
 objectFit="cover"
/>
<Box>
<Text as="h1" fontSize="30pt" fontWeight="400">
      John
  </Text>
  <Text as="h5" fontSize="13pt" fontWeight="bold" color="purple.400">
      Stuent
  </Text> 
  </Box>
</Flex>


<Center bg="" w="100%" maxW="3xl" borderRadius="">
  
<Stack spacing={2} fontSize="15pt" fontWeight="400">

<Box as="hr" mb="3%" w="100%" borderWidth="1px" color="gray.500"></Box>


<Box w="100%"  p="4" maxW="xl" letterSpacing="1px" mb="5px">
  <Text as="h5" textAlign="center" fontSize="12pt" mb="10px" fontWeight="bold">Basic Info</Text>
     <Box mb="5%"> 
      <Text>
        Email : John@gmail.com
      </Text> 
      <Text>
        Registration No : 1234567
      </Text> 
      <Text>
        Department : CSE
      </Text> 
      <Text>
        Session : 17-18
      </Text>
      <Text>
        Gender : Male
      </Text>
      </Box>
      <Box mb="5%">
      <Text as="h5" textAlign="center" fontSize="12pt" mb="10px" fontWeight="bold">Contact Info</Text>  
      <Text>
        Address : xxxxx
      </Text> 
      <Text>
        Contact No : 4587498579834
      </Text>
      </Box>
      </Box>

      <Center>
{/* <Box as="hr" mb="4%" w="100%" borderWidth="1px" color="teal.300"></Box> */}
</Center>
    </Stack>
     
</Center>
<Center>
<Link  textAlign="center"  mb="1%" bg="purple.400" w="25%" p="1.1%"  color="white" fontSize="12pt" borderRadius="20px">
<a>Edit your profile</a>
</Link>
</Center>

  </Box>
</Container>
    </>
  );
};

export default Profile;
