import { configureStore } from '@reduxjs/toolkit'

import { reducer as apiGetRequestReducer, reducerPath as apiGetRequestReducerPath } from './api'
import { editReducer, editReducerPath } from './edit'

export const store = configureStore({
    reducer: {
        [apiGetRequestReducerPath]: apiGetRequestReducer,
        [editReducerPath]: editReducer,
    },
})


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch