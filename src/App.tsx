import React from "react";
import { EditOutlined } from "@ant-design/icons";
import ScreenEditTestSuite from "./components/ScreenEditTestSuite";
import Spinner from "./components/Spinner";
import { useApiGet } from "./data/api";
import { TestPlan, TestSuite } from "./types";
import { useDispatch } from "react-redux";
import { resetDirtyEdits } from "./data/edit";
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Heading } from "@chakra-ui/react";


const TestPlanComponent = ({ plan }: { plan: TestPlan }) => {
  return (<div>
    <span>{plan.test_name}</span> | <span>{plan.browser}</span> | <span>{plan.instruction_count}</span>
  </div>)
}

const TestPlansComponent = ({ test_plans }: { test_plans: Record<string, TestPlan> }) => {
  return <>{Object.entries(test_plans).map(([i, plan]) => <TestPlanComponent plan={plan} key={i} />)}</>
}

const TestSuiteComponent = ({ testSuite }: { testSuite: TestSuite }) => {
  const dispatch = useDispatch()

  return (<div key={testSuite.id}>
    <Heading>
      <>
        {testSuite.test_suite_name}
        |
        {Object.entries(testSuite.test_plans).length}
        |
        <button onClick={() => {
          dispatch(resetDirtyEdits(testSuite.id))
        }}>
          <EditOutlined />
        </button>
      </>
    </Heading>

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
            <ScreenEditTestSuite />

            <Accordion defaultIndex={[0]} allowMultiple>
              {Object.entries(data || {}).map(([id, testSuite]) => (
                <AccordionItem>
                  <AccordionButton>
                    <Box flex='1' textAlign='left'>
                      <TestSuiteComponent testSuite={testSuite} key={id} />
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel pb={4}>
                    <TestPlansComponent test_plans={testSuite.test_plans} />
                  </AccordionPanel>
                </AccordionItem>
              ))}
            </Accordion>
          </>
      }
    </div>
  );
}

export default App;
