import React from "react";
import { useDispatch } from "react-redux";
import { upsertTsPlan } from "../data/edit";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";

export const PlanNameInput = ({ test_plan_id, test_name }: { test_plan_id: string; test_name: string; }) => {
    const dispatch = useDispatch();

    const onNameChanged = (val: string) => {
        dispatch(upsertTsPlan({ [test_plan_id]: { test_name: val } }));
    };

    return <FormControl>
        <FormLabel>Plan Name</FormLabel>
        <Input required id={`name_${test_plan_id}`} value={test_name} onChange={(e) => onNameChanged(e.target.value)} />
    </FormControl>;

};
