import React from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Select,
  Heading,
  Flex,
  Link,
  Text,
  Container,
  Button,
} from "@chakra-ui/react";

export default function Reg() {
  return (
    <>
      <Container bg="teal.100" p={4} rounded="md" boxShadow="dark-lg">
        <Heading as="h3" mb="10px" textAlign="center">
          Registration form
        </Heading>
        <FormControl id="full-name" isRequired>
          <FormLabel>Your Full name</FormLabel>
          <Input
            type="text"
            focusBorderColor="teal.400"
            mb={4}
            placeholder="Enter Your Full name"
          />
        </FormControl>
        <FormControl id="email" isRequired>
          <FormLabel>Your Email ID</FormLabel>
          <Input
            type="email"
            focusBorderColor="teal.400"
            mb={4}
            placeholder="Enter Your Email ID"
          />
        </FormControl>
        <FormControl id="pass" isRequired>
          <FormLabel>Your Password</FormLabel>
          <Input
            type="password"
            focusBorderColor="teal.400"
            mb={4}
            placeholder="Give A New Password"
          />
        </FormControl>
        <FormControl id="conpass" isRequired>
          <FormLabel>Confirm Password</FormLabel>
          <Input
            type="password"
            focusBorderColor="teal.400"
            mb={4}
            placeholder="Confirm Your Password"
          />
        </FormControl>
        <FormControl id="token" isRequired>
          <FormLabel>Token</FormLabel>
          <Input
            type="number"
            focusBorderColor="teal.400"
            mb={4}
            placeholder="Give Your Token"
          />
        </FormControl>
        <FormControl id="reg no" isRequired>
          <FormLabel>Your Registration Number</FormLabel>
          <Input
            type="number"
            focusBorderColor="teal.400"
            mb={4}
            placeholder="Enter Your Registration name"
          />
        </FormControl>
        <FormControl id="dept">
          <FormLabel>Select Your Department</FormLabel>
          <Select
            placeholder="Select Department"
            mb={3}
            focusBorderColor="gray.400"
          >
            <option>CSE</option>
            <option>EEE</option>
            <option>CE</option>
          </Select>
        </FormControl>
        <Button type="submit" colorScheme="teal" mt={4} py={4} variant="solid">
          Submit
        </Button>
      </Container>
    </>
  );
}
