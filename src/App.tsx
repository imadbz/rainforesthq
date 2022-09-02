import { EditOutlined } from "@ant-design/icons";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import ScreenEditTestSuite from "./components/ScreenEditTestSuite";
import Spinner from "./components/Spinner";
import { useApiGet } from "./data/api";
import { TestSuite } from "./types";

function App() {
  const { data, error, isLoading } = useApiGet<TestSuite[]>("/test_suites")

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
            {data?.map(testSuite => <div key={testSuite.id}>
              <h3>{testSuite.test_suite_name} | {testSuite.test_plans.length} | <button><EditOutlined /></button></h3>
              {testSuite.test_plans.map((plan, i) =>
                <div key={i}>
                  <span>{plan.test_name}</span> | <span>{plan.browser}</span> | <span>{plan.instruction_count}</span>
                </div>)}
            </div>)}
          </>
      }
    </div>
  );
}

export default App;
