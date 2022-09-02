import { TestSuite } from './../types.d';
/**
 * 
 * ----- NOTE: in production code we should be using rtk-query or something similar
 *             https://redux-toolkit.js.org/rtk-query/overview
 * 
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

const baseUrl = process.env.REACT_APP_API_BASE_URL!;


const initialState = {} as Partial<TestSuite>

export const apiGetRequestSlice = createSlice({
    name: 'getRequest',
    initialState,
    reducers: {
        updateTsName: (state, action: PayloadAction<string>) => {
            state.test_suite_name = action.payload
        },
    },
})

// const { setData, setError, setIsLoading } = apiGetRequestSlice.actions

export const reducerPath = apiGetRequestSlice.name
export const reducer = apiGetRequestSlice.reducer
