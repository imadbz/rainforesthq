import { TestSuite } from './../types.d';
/**
 * 
 * ----- NOTE: in production code we should be using rtk-query or something similar
 *             https://redux-toolkit.js.org/rtk-query/overview
 * 
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const baseUrl = process.env.REACT_APP_API_BASE_URL!;

export type ApiResponse<T> = {
    data: T | null,
    error: any | null,
    isLoading: boolean
}

const initialState = {} as Record<string, ApiResponse<any>>

export const apiGetRequestSlice = createSlice({
    name: 'apiData',
    initialState,
    reducers: {
        setData: (state, action: PayloadAction<{ endpoint: string; data: any }>) => {
            const { endpoint, data } = action.payload
            state[endpoint] = { ...state[endpoint], data }
        },
        setError: (state, action: PayloadAction<{ endpoint: string; error: any }>) => {
            const { endpoint, error } = action.payload
            state[endpoint] = { ...state[endpoint], error }
        },
        setIsLoading: (state, action: PayloadAction<{ endpoint: string; isLoading: boolean }>) => {
            const { endpoint, isLoading } = action.payload
            state[endpoint] = { ...state[endpoint], isLoading }
        },

        setTestSuiteById: (state, action: PayloadAction<{ id: string; data: TestSuite }>) => {
            const { id, data } = action.payload
            state[endpoints.test_suites].data[id] = { ...data }
        },
    },
})

const { setData, setError, setIsLoading, setTestSuiteById } = apiGetRequestSlice.actions

export { setTestSuiteById };

export const reducerPath = apiGetRequestSlice.name
export const reducer = apiGetRequestSlice.reducer

export const useApiGet = <T, V>(endpoint: string, transform: (data: T) => V) => {
    const reducerPath = endpoint

    const dispatch = useDispatch()
    const { data, error, isLoading } = useSelector((state: any) => state.apiData[endpoint] || {}) as ApiResponse<V>

    const get = async () => {
        dispatch(setIsLoading({ endpoint, isLoading: true }));
        try {
            const res = await fetch(baseUrl + endpoint);
            const data = await res.json() as T;
            const transformed = transform(data)
            dispatch(setData({ endpoint, data: transformed }));
        } catch (error) {
            console.error(error)
            dispatch(setError({ endpoint, error: "request failed" }));
        }
        dispatch(setIsLoading({ endpoint, isLoading: false }));
    };

    useEffect(() => {
        get();
    }, []);

    return { data, error, isLoading, reducerPath };
};

export const endpoints = {
    test_suites: "test_suites"
}
