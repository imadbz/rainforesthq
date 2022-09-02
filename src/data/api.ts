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

type ApiResponse<T> = {
    data: T | null,
    error: any | null,
    isLoading: boolean
}

const initialState = {} as Record<string, ApiResponse<any>>

export const apiGetRequestSlice = createSlice({
    name: 'getRequest',
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
    },
})

const { setData, setError, setIsLoading } = apiGetRequestSlice.actions

export const reducerPath = apiGetRequestSlice.name
export const reducer = apiGetRequestSlice.reducer

export const useApiGet = <T>(endpoint: string) => {
    const reducerPath = endpoint.replace("/", "")

    const dispatch = useDispatch()
    const { data, error, isLoading } = useSelector((state: any) => state.getRequest[endpoint] || {}) as ApiResponse<T>

    const get = async () => {
        dispatch(setIsLoading({ endpoint, isLoading: true }));
        try {
            const res = await fetch(baseUrl + endpoint);
            const data = await res.json() as T;
            dispatch(setData({ endpoint, data }));
        } catch (error) {
            dispatch(setError({ endpoint, error }));
        }
        dispatch(setIsLoading({ endpoint, isLoading: false }));
    };

    useEffect(() => {
        get();
    }, []);

    return { data, error, isLoading, reducerPath };
};