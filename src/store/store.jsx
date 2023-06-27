import { configureStore } from "@reduxjs/toolkit";

import pageNumberReducer from './pageNumberSlice';

export const store = configureStore({
    reducer: {
        pageNumber: pageNumberReducer,
    }
})

export const AppDispatch = store.getState();
export const RootState = store.getState();