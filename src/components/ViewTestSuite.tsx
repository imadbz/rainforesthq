import React from "react";
import { EditFilled, EditOutlined } from "@ant-design/icons";
import { TestSuite } from "../types";
import { useDispatch } from "react-redux";
import { resetDirtyEdits } from "../data/edit";
import { Badge, Box, Button, Flex, Heading, HStack, Tag, Text } from "@chakra-ui/react";
import { disclosures, openDisclosure } from "../data/disclosure";

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
