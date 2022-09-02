import React from "react";
import { TestPlan } from "../types";
import { TestPlanComponent } from "./TestPlanComponent";

export const TestPlansComponent = ({ test_plans }: { test_plans: Record<string, TestPlan>; }) => {
    return <>{Object.entries(test_plans).map(([i, plan]) => <TestPlanComponent plan={plan} key={i} />)}</>;
};
