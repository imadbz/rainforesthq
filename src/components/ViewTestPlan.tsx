import { Badge, HStack, Text } from "@chakra-ui/react";
import React from "react";
import { TestPlan } from "../types";

export const TestPlanComponent = ({ plan }: { plan: TestPlan; }) => {
    return (<HStack>
        <Text>{plan.test_name}</Text>
        <Badge>{plan.browser}</Badge>
        <Badge>{plan.instruction_count}</Badge>
    </HStack>);
};
