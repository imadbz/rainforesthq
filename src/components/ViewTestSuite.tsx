import { EditFilled } from "@ant-design/icons";
import { Badge, Button, Flex, Heading, HStack } from "@chakra-ui/react";
import React from "react";
import { useDispatch } from "react-redux";
import { disclosures, openDisclosure } from "../data/disclosure";
import { resetDirtyEdits } from "../data/edit";
import { TestSuite } from "../types";

export const TestSuiteComponent = ({ testSuite }: { testSuite: TestSuite; }) => {
    const dispatch = useDispatch();


    return (
        <HStack key={testSuite.id} spacing={4}>
            <HStack>
                <Heading size={"md"}>{testSuite.test_suite_name}</Heading>

                <Badge colorScheme={"teal"}>{Object.entries(testSuite.test_plans).length}</Badge>

            </HStack>
            <Flex
                flex={1}
                justifyContent={"end"}
            >
                <Button
                    colorScheme={"cyan"}
                    variant="outline"
                    size={"xs"}
                    onClick={(e) => {
                        e.preventDefault();
                        dispatch(resetDirtyEdits(testSuite.id));
                        dispatch(openDisclosure(disclosures.editModal));

                    }}>
                    <EditFilled /> Edit
                </Button>
            </Flex>
        </HStack>
    );
};
