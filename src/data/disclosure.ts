import { TestPlan, TestSuite } from '../types';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {} as Record<string, boolean>

export const disclosureSlice = createSlice({
    name: 'disclosure',
    initialState,
    reducers: {
        open: (state, action: PayloadAction<string>) => {
            state[action.payload] = true
        },
        close: (state, action: PayloadAction<string>) => {
            state[action.payload] = false
        },
    },
})

export const { open: openDisclosure, close: closeDisclosure } = disclosureSlice.actions

export const disclosureReducerPath = disclosureSlice.name
export const disclosureReducer = disclosureSlice.reducer

export const disclosures = {
    editModal: "editModal"
}