import React from "react";
import { EditOutlined } from "@ant-design/icons";
import ScreenEditTestSuite from "./components/ScreenEditTestSuite";
import Spinner from "./components/Spinner";
import { useApiGet } from "./data/api";
import { TestPlan, TestSuite } from "./types";
import { useDispatch } from "react-redux";
import { resetDirtyEdits } from "./data/edit";


const TestPlanComponent = ({ plan }: { plan: TestPlan }) => {
  return (<div>
    <span>{plan.test_name}</span> | <span>{plan.browser}</span> | <span>{plan.instruction_count}</span>
  </div>)
}

const TestSuiteComponent = ({ testSuite }: { testSuite: TestSuite }) => {
  const plans = Object.entries(testSuite.test_plans)
  const dispatch = useDispatch()

  return (<div key={testSuite.id}>
    <h3>{testSuite.test_suite_name} | {plans.length} | <button onClick={() => {
      dispatch(resetDirtyEdits(testSuite.id))
    }}><EditOutlined /></button></h3>
    {plans.map(([i, plan]) => <TestPlanComponent plan={plan} key={i} />)}
  </div>)
}

function App() {
  const { data, error, isLoading } =
    useApiGet<TestSuite[], Record<number, TestSuite>>(
      "test_suites",
      (data) => {
        const transformed = data.reduce((acc, ts) => {
          ts.test_plans = Object.assign({}, ts.test_plans);
          acc[ts.id] = ts;
          return acc;
        }, {} as Record<number, TestSuite>)

        return transformed;
      }
    )

  return (
    <div className="App">
      {isLoading ? <Spinner />
        : error ? <div>Something went wrong! please refresh to try again.</div>
          : <>
            <header className="App-header">
              <p>
                Edit <code> src / App.js </code> and save to reload.
              </p>
            </header>
            <ScreenEditTestSuite />
            {Object.entries(data || {}).map(([id, testSuite]) => <TestSuiteComponent testSuite={testSuite} key={id} />)}
          </>
      }
    </div>
  );
}

export default App;
