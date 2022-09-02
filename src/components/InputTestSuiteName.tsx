import React from "react";
import { useDispatch } from "react-redux";
import { updateTsName } from "../data/edit";
import { FormControl, FormErrorMessage, FormLabel, Input } from "@chakra-ui/react";

export const TestSuiteNameInput = ({ test_suite_name }: { test_suite_name: string; }) => {
    const dispatch = useDispatch();

    const isTestSuiteNameError = !test_suite_name?.length;

    return <FormControl isInvalid={isTestSuiteNameError}>
        <FormLabel>Test Suite Name</FormLabel>
        <Input
            required
            name="test_suite_name"
            value={test_suite_name}
            onChange={(e) => dispatch(updateTsName(e.target.value))} />
        {!isTestSuiteNameError ? <></> : (
            <FormErrorMessage>required!</FormErrorMessage>
        )}
    </FormControl>;
};
