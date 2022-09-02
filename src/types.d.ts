export interface TestSuite {
    id: number;
    test_suite_name: string;
    test_plans: Record<string, TestPlan>;
}

export interface TestPlan {
    test_name: string;
    browser: string;
    instruction_count: number;

    isDeleted: boolean
}
