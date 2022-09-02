import { FormControl, FormLabel, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper } from "@chakra-ui/react";
import React from "react";
import { useDispatch } from "react-redux";
import { upsertTsPlan } from "../data/edit";

export const InstructionCountInput = ({ test_plan_id, instruction_count }: { test_plan_id: string; instruction_count: number; }) => {
    const dispatch = useDispatch();

    const onCountChanged = (val: string) => {
        dispatch(upsertTsPlan({ [test_plan_id]: { instruction_count: parseInt(val) } }));
    };

    return <FormControl>
        <FormLabel>Instruction Count</FormLabel>
        <NumberInput defaultValue={instruction_count} min={0} value={instruction_count} onChange={(v) => onCountChanged(v)}>
            <NumberInputField />
            <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
            </NumberInputStepper>
        </NumberInput>
    </FormControl>;
};
