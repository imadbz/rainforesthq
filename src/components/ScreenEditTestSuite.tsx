import { LoadingOutlined } from "@ant-design/icons";
import React from "react";
import { useSelector } from "react-redux";
import { TestPlan, TestSuite } from "../types";
import { RootState } from "../data/store";
import { endpoints } from "../data/api";
import { createSelector } from "@reduxjs/toolkit";

const TestPlanEdit = ({ test_suite_id, test_plan_id }: { test_suite_id: string; test_plan_id: string }) => {
    const selectTestPlan = createSelector(
        (state: RootState) => state.getRequest[endpoints.test_suites]?.data,
        (test_suites: Record<string, TestSuite>) => test_suites[test_suite_id],
        (ts: TestSuite) => ts.test_plans[test_plan_id]
    )

    const test_plan = useSelector(selectTestPlan)

    const browsers = ["chrome", "firefox", "safari", "edge"]

    return (
        <div>
            <label htmlFor="name">name</label>
            <input id="name" />
            <label htmlFor="ins_count">instruction count</label>
            <input type="number" id="ins_count" />

            <fieldset>
                <legend>Select a browser:</legend>
                {browsers.map((b) => {
                    const displayName = b[0].toUpperCase() + b.slice(1)
                    return (
                        <div>
                            <input type="radio" id={b} name="browser" value={b}
                                checked />
                            <label htmlFor={b}>{displayName}</label>
                        </div>
                    )
                })}
            </fieldset>

        </div>
    )
}

export default () => {
    const test_suite = {} as TestSuite

    return <div>
        test suite edit screen
        <input name="test_suite_name" />
        {Object.entries(test_suite.test_plans || {}).map(([key, plan]) => <TestPlanEdit key={key} test_plan_id={key} test_suite_id={test_suite.id.toString()} />)}

        <button>Add test plan</button>
        <button type="submit">save</button>
        <button name="cancel">cancel</button>
    </div>
}