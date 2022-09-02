import { DeleteOutlined } from "@ant-design/icons";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { TestSuite } from "../types";
import { RootState } from "../data/store";
import { endpoints, setTestSuiteById } from "../data/api";
import { createSelector } from "@reduxjs/toolkit";
import { resetDirtyEdits, updateTsName, upsertTsPlan } from "../data/edit";
import deepmerge from "deepmerge";
import { Badge, Box, Button, FormErrorMessage, FormHelperText, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Tag, TagLabel, useDisclosure, VStack } from "@chakra-ui/react";
import { closeDisclosure, disclosures } from "../data/disclosure";
import { isError as isTestSuiteNameError } from "lodash";
import { BrowsersInput } from "./InputBrowsers";
import { InstructionCountInput } from "./InputInstructionCount";
import { PlanNameInput } from "./InputPlanName";

export default ({ test_suite_id, test_plan_id }: { test_suite_id: string; test_plan_id: string }) => {
    const dispatch = useDispatch()
    /**
     * Selectors
     */
    const selectTestPlan = createSelector(
        (state: RootState) => state.apiData[endpoints.test_suites]?.data,
        (test_suites: Record<string, TestSuite>) => test_suites[test_suite_id].test_plans?.[test_plan_id],
    )

    const test_plan_original = useSelector(selectTestPlan)

    const test_plan_dirty = useSelector((state: RootState) => state.dirty.test_plans?.[test_plan_id])

    const test_plan = deepmerge(test_plan_original || {}, test_plan_dirty || {})


    /**
     * Actions
     */
    const removeTestPlan = () => {
        dispatch(upsertTsPlan({ [test_plan_id]: { isDeleted: true } }))
    }

    return (
        <>
            {
                test_plan.isDeleted ? <></> :
                    <VStack spacing={3} p={3} my={3} border={"1px solid rgba(0,0,0,0.1)"} borderRadius="lg">
                        <Badge variant={"subtle"} colorScheme={"orange"}>{parseInt(test_plan_id) + 1}</Badge>

                        <PlanNameInput test_plan_id={test_plan_id} test_name={test_plan.test_name} />
                        <InstructionCountInput test_plan_id={test_plan_id} instruction_count={test_plan.instruction_count} />
                        <BrowsersInput browser={test_plan?.browser} test_plan_id={test_plan_id} />

                        <Button size={"xs"} colorScheme="cyan" variant={"outline"} onClick={() => removeTestPlan()}><DeleteOutlined /> Delete</Button>
                    </VStack>
            }</>
    )
}