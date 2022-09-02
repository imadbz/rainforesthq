import { Button, FormLabel, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import { createSelector } from "@reduxjs/toolkit";
import deepmerge from "deepmerge";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { endpoints, setTestSuiteById } from "../data/api";
import { closeDisclosure, disclosures } from "../data/disclosure";
import { resetDirtyEdits, upsertTsPlan } from "../data/edit";
import { RootState } from "../data/store";
import { TestSuite } from "../types";
import EditTestPlan from "./EditTestPlan";
import { TestSuiteNameInput } from "./InputTestSuiteName";


export default () => {
    const dispatch = useDispatch()

    /**
     * Selectors
     */
    const isOpen = useSelector((state: RootState) => state.disclosure[disclosures.editModal])

    const testSuiteId = useSelector((state: RootState) => state.dirty.id!)

    const selectTestSuite = createSelector(
        (state: RootState) => state?.apiData?.[endpoints.test_suites]?.data,
        (test_suites: Record<string, TestSuite>) => test_suites?.[testSuiteId],
    )

    const test_suite_original = useSelector(selectTestSuite)
    const test_suite_dirty = useSelector((state: RootState) => state.dirty)

    const test_suite = deepmerge(test_suite_original, test_suite_dirty)

    const plansLen = Object.keys(test_suite?.test_plans || {}).length

    /**
     * actions
     */
    const onClose = () => {
        cancelEdits()
        dispatch(closeDisclosure(disclosures.editModal))
    }

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


    return <Modal isOpen={isOpen} onClose={onClose} motionPreset='slideInBottom' size={"xl"}>
        <ModalOverlay
            bg='none'
            backdropFilter='auto'
            backdropInvert='80%'
            backdropBlur='2px'
        />
        <ModalContent>
            <form onSubmit={(e) => {
                e.preventDefault()
                submit()
                onClose()
            }}>
                <ModalHeader>Edit: {test_suite.test_suite_name}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>

                    <TestSuiteNameInput test_suite_name={test_suite.test_suite_name} />

                    <FormLabel>Test Plans</FormLabel>
                    {Object.entries(test_suite?.test_plans || {}).map(([key, plan]) => <EditTestPlan key={key} test_plan_id={key} test_suite_id={testSuiteId.toString()} />)}

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