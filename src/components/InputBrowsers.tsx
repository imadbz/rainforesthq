import { FormControl, FormLabel, HStack, Radio, RadioGroup } from "@chakra-ui/react";
import React from "react";
import { useDispatch } from "react-redux";
import { upsertTsPlan } from "../data/edit";

export const BrowsersInput = ({ browser, test_plan_id }: { browser: string; test_plan_id: string; }) => {
    const dispatch = useDispatch();

    const browsers = ["chrome", "firefox", "safari", "edge"];

    const onBrowserSelected = (val: string) => {
        dispatch(upsertTsPlan({ [test_plan_id]: { browser: val } }));
    };

    return <FormControl as='fieldset'>
        <FormLabel as='legend'>Select a browser</FormLabel>
        <RadioGroup defaultValue={browser}>
            <HStack spacing='24px'>
                {browsers.map((b) => {
                    const displayName = b[0].toUpperCase() + b.slice(1);
                    const key = `${b}_${test_plan_id}`;
                    return (
                        <Radio
                            key={key}
                            value={b}
                            checked={browser === b}
                            onChange={(e) => onBrowserSelected(e.currentTarget.value)}
                        >
                            {displayName}
                        </Radio>
                    );
                })}
            </HStack>
        </RadioGroup>
    </FormControl>;
};
