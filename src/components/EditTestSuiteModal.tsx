import { DeleteOutlined } from "@ant-design/icons";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { TestSuite } from "../types";
import { RootState } from "../data/store";
import { endpoints, setTestSuiteById } from "../data/api";
import { createSelector } from "@reduxjs/toolkit";
import { resetDirtyEdits, updateTsName, upsertTsPlan } from "../data/edit";
import deepmerge from "deepmerge";
import { Button, FormControl, FormErrorMessage, FormHelperText, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import { closeDisclosure, disclosures } from "../data/disclosure";
import { isError as isTestSuiteNameError } from "lodash";

const TestPlanEdit = ({ test_suite_id, test_plan_id }: { test_suite_id: string; test_plan_id: string }) => {
    const dispatch = useDispatch()

    const selectTestPlan = createSelector(
        (state: RootState) => state.apiData[endpoints.test_suites]?.data,
        (test_suites: Record<string, TestSuite>) => test_suites[test_suite_id].test_plans?.[test_plan_id],
    )

    const test_plan_original = useSelector(selectTestPlan)

    const test_plan_dirty = useSelector((state: RootState) => state.dirty.test_plans?.[test_plan_id])

    const test_plan = deepmerge(test_plan_original || {}, test_plan_dirty || {})

    const browsers = ["chrome", "firefox", "safari", "edge"]

    const removeTestPlan = () => {
        dispatch(upsertTsPlan({ [test_plan_id]: { isDeleted: true } }))
    }

    const onBrowserSelected = (val: string) => {
        dispatch(upsertTsPlan({ [test_plan_id]: { browser: val } }))
    }

    const onNameChanged = (val: string) => {
        dispatch(upsertTsPlan({ [test_plan_id]: { test_name: val } }))
    }

    const onCountChanged = (val: string) => {
        dispatch(upsertTsPlan({ [test_plan_id]: { instruction_count: parseInt(val) } }))
    }


    return (
        <>
            {
                test_plan.isDeleted ? <></> :
                    <>
                        <label htmlFor={`name_${test_plan_id}`}>name</label>
                        <input required id={`name_${test_plan_id}`} value={test_plan.test_name} onChange={(e) => onNameChanged(e.target.value)} />
                        <label htmlFor={`ins_count_${test_plan_id}`}>instruction count</label>
                        <input required type="number" id={`ins_count_${test_plan_id}`} min="0" value={test_plan.instruction_count} onChange={(e) => onCountChanged(e.target.value)} />

                        <fieldset>
                            <legend>Select a browser:</legend>
                            {browsers.map((b) => {
                                const displayName = b[0].toUpperCase() + b.slice(1)
                                const key = `${b}_${test_plan_id}`
                                return (
                                    <div key={key}>
                                        <input type="radio" id={key} name={key} value={b}
                                            checked={test_plan?.browser === b}
                                            onChange={(e) => onBrowserSelected(e.currentTarget.value)} />
                                        <label htmlFor={key}>{displayName}</label>
                                    </div>
                                )
                            })}
                        </fieldset>

                        <button onClick={() => removeTestPlan()}><DeleteOutlined /></button>

                    </>
            }</>
    )
}

export default () => {
    const dispatch = useDispatch()
    const isOpen = useSelector((state: RootState) => state.disclosure[disclosures.editModal])
    const onClose = () => {
        cancelEdits()
        dispatch(closeDisclosure(disclosures.editModal))
    }

    const testSuiteId = useSelector((state: RootState) => state.dirty.id!)

    const selectTestSuite = createSelector(
        (state: RootState) => state?.apiData?.[endpoints.test_suites]?.data,
        (test_suites: Record<string, TestSuite>) => test_suites?.[testSuiteId],
    )

    const test_suite_original = useSelector(selectTestSuite)
    const test_suite_dirty = useSelector((state: RootState) => state.dirty)

    const test_suite = deepmerge(test_suite_original, test_suite_dirty)

    const plansLen = Object.keys(test_suite?.test_plans || {}).length

    const addNewTestPlan = () => {
        dispatch(upsertTsPlan({ [plansLen]: {} }))
    }

    const cancelEdits = () => {
        dispatch(resetDirtyEdits(test_suite_dirty.id || 1))
    }

    const submit = () => {
        const withoutDeletes = { ...test_suite }
        withoutDeletes.test_plans = Object.fromEntries(Object.entries(withoutDeletes.test_plans).filter(([k, v]) => !v.isDeleted))

        dispatch(setTestSuiteById({ id: testSuiteId.toString(), data: withoutDeletes }))
        dispatch(resetDirtyEdits(testSuiteId))

        // KEEP! per assignement
        console.log(`Submitted data:\nupdate test_suite with id: ${testSuiteId}\n`, JSON.stringify(withoutDeletes))
    }

    const isTestSuiteNameError = !test_suite.test_suite_name.length

    return <Modal isOpen={isOpen} onClose={onClose} motionPreset='slideInBottom'>
        <ModalOverlay />
        <ModalContent>
            <form onSubmit={(e) => {
                e.preventDefault()
                submit()
                onClose()
            }}>
                <ModalHeader>Edit: {test_suite.test_suite_name}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>

                    <FormControl isInvalid={isTestSuiteNameError}>
                        <FormLabel>Test Suite Name</FormLabel>
                        <Input required name="test_suite_name" value={test_suite.test_suite_name} onChange={(e) => dispatch(updateTsName(e.target.value))} />
                        {!isTestSuiteNameError ? <></> : (
                            <FormErrorMessage>required!</FormErrorMessage>
                        )}
                    </FormControl>

                    {Object.entries(test_suite?.test_plans || {}).map(([key, plan]) => <TestPlanEdit key={key} test_plan_id={key} test_suite_id={testSuiteId.toString()} />)}

                    <Button onClick={() => addNewTestPlan()}>Add test plan</Button>
                </ModalBody>

                <ModalFooter>
                    <Button type="submit" name="submit" colorScheme={"blue"} mr={3}>
                        Save
                    </Button>
                    <Button variant='ghost' name="cancel" onClick={() => onClose()}>Cancel</Button>
                </ModalFooter>
            </form>
        </ModalContent>
    </Modal>
}