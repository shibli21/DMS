import React from 'react';
// import App from '../components/navbar.js';
import {Container,FormControl,
  FormLabel,Input,Select,Text,
  FormErrorMessage,Flex,
  FormHelperText,Heading,Link,Spacer,Button} from '@chakra-ui/react'
  
  
export default function Login() {
  
  return (
    <>
<Container bg="teal.100" p={5} rounded="md" boxShadow="dark-lg">
   <Heading as="h3" mb="10px" textAlign="center">
           Login form
     </Heading>
  
<FormControl id="email" isRequired>
  <FormLabel>Email ID</FormLabel>
  <Input type="email" focusBorderColor="teal.400"  mb={4}   placeholder="Enter Your Email ID" />
</FormControl>
<FormControl id="pass" isRequired>
  <FormLabel>Password</FormLabel>
  <Input type="password" focusBorderColor="teal.400"   mb={4}  placeholder="Give Your Password"/>
</FormControl>

<Button type="submit" colorScheme="teal" mt={4} py={4} variant="solid">Submit</Button>  

</Container>
</>
  );
}
