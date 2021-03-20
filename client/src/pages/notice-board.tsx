import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Container,
  HStack,
  Text,
} from "@chakra-ui/react";
import { DateTime } from "luxon";
import React from "react";
import { useMyNoticesQuery } from "../generated/graphql";

interface Props {}

const TestResults = (props: Props) => {
  const { data } = useMyNoticesQuery();

  return (
    <>
      <Container>
        <Text textAlign="center" fontWeight="bold" fontSize="3xl" bg="red.400" p={2} color="white" mb={10}>
          Notice Board
        </Text>
      </Container>

      {data?.myNotices?.length > 0 ? (
        <Accordion allowToggle>
          {data?.myNotices?.map((n) => (
            <AccordionItem key={n.id}>
              <Box>
                <HStack as={AccordionButton} justify="space-between">
                  <Box textAlign="left" textTransform="capitalize" fontWeight="600" fontSize="lg">
                    {n.title}
                  </Box>
                  <Box fontFamily="poppins">
                    {DateTime.fromMillis(parseInt(n.createdAt)).toLocaleString(DateTime.DATE_MED)}
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
        <Box bg="red.400" display="inline-block"></Box>
      )}
    </>
  );
};

export default TestResults;
