import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { TestSuite } from "./types";

function App() {
  if (!process.env.REACT_APP_API_BASE_URL) {
    throw new Error("REACT_APP_API_BASE_URL env variable must not be empty")
  }

  const test_suites_url = process.env.REACT_APP_API_BASE_URL + "/test_suites"

  const [testSuites, setTestSuites] = useState(null as TestSuite[] | null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(test_suites_url).then(res => res.json()).then(res => {
      setTestSuites(res)
      setLoading(false)
      console.log("fetched test_suites successfully", res.length)
    }).catch(err => {
      setLoading(false)
      console.error(err)
    })
  }, [])

  const isError = !loading && !testSuites

  return (
    <div className="App">
      {isError ? <div>Something went wrong! please refresh to try again.</div> :
        <>
          <header className="App-header">
            <p>
              Edit <code> src / App.js </code> and save to reload.
            </p>
          </header>
          {testSuites?.map(testSuite => <div key={testSuite.id}>
            <h3>{testSuite.test_suite_name} | {testSuite.test_plans.length}</h3>
            {testSuite.test_plans.map((plan, i) =>
              <div key={i}>
                <p>{plan.test_name} | {plan.browser} | {plan.instruction_count}</p>
                <button>edit</button>
              </div>)}
          </div>)}
        </>
      }
    </div>
  );
}

export default App;
