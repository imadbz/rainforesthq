import React from "react";
import ScreenEditTestSuite from "./EditTestSuiteModal";
import Spinner from "./Spinner";
import { useApiGet } from "../data/api";
import { TestSuite } from "../types";
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Center, Container, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import { TestPlansComponent } from "./ViewTestPlans";
import { TestSuiteComponent } from "./ViewTestSuite";


function App() {
  const { data, error, isLoading } =
    useApiGet<TestSuite[], Record<number, TestSuite>>(
      "test_suites",
      (data) => {
        const transformed = data.reduce((acc, ts) => {
          ts.test_plans = Object.assign({}, ts.test_plans);
          acc[ts.id] = ts;
          return acc;
        }, {} as Record<number, TestSuite>)

        return transformed;
      }
    )

  return (
    <Container maxW="900px" p={"10"}>
      {isLoading ? <Center w="full" h="full"><Spinner /></Center>
        : error ? <VStack w="full" h="full">
          <Heading>Something went wrong!</Heading>
          <Text>please refresh to try again.</Text>
        </VStack>
          : <>

            <ScreenEditTestSuite />
            <Heading py={"12"} textAlign="center">Test Suites</Heading>

            <Accordion defaultIndex={[0]} allowMultiple>
              {Object.entries(data || {}).map(([id, testSuite]) => (
                <AccordionItem>
                  <AccordionButton>
                    <Box flex='1' textAlign='left'>
                      <TestSuiteComponent testSuite={testSuite} key={id} />
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel pb={4}>
                    <TestPlansComponent test_plans={testSuite.test_plans} />
                  </AccordionPanel>
                </AccordionItem>
              ))}
            </Accordion>
          </>
      }
    </Container>
  );
}

export default App;
