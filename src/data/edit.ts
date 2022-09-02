import { TestPlan, TestSuite } from './../types.d';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = { id: 1 } as Partial<TestSuite>

export const dirtySlice = createSlice({
    name: 'dirty',
    initialState,
    reducers: {
        updateTsName: (state, action: PayloadAction<string>) => {
            state.test_suite_name = action.payload
        },
        upsertTsPlan: (state, action: PayloadAction<Record<string, Partial<TestPlan>>>) => {
            if (!state.test_plans) state.test_plans = {}

            Object.entries(action.payload).forEach(([key, plan]) => {
                if (!state.test_plans![key]) state.test_plans![key] = {} as TestPlan

                state.test_plans![key] = { ...state.test_plans![key], ...plan }
            })

        },
        resetDirtyEdits: (state, action: PayloadAction<number>) => {
            state = {
                id: action.payload
            }

            return state;
        }
    },
})

export const { updateTsName, upsertTsPlan, resetDirtyEdits } = dirtySlice.actions

export const editReducerPath = dirtySlice.name
export const editReducer = dirtySlice.reducer
