import { LoadingOutlined } from "@ant-design/icons";
import React from "react";
import { TestPlan, TestSuite } from "../types";

const TestPlanEdit = () => {
    const test_plan = {} as TestPlan

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
        {test_suite.test_plans?.map((plan) => <TestPlanEdit />)}

        <button>Add test plan</button>
        <button type="submit">save</button>
        <button name="cancel">cancel</button>
    </div>
}