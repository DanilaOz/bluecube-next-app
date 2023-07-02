import { configureStore } from "@reduxjs/toolkit";

import cartUpdateDataReducer, {loadCartState, saveCartState} from './features/dataCartUpdateSlice'

const persistedState = loadCartState();

export const store = configureStore({
    reducer: {
        updateData: cartUpdateDataReducer,
    },
    preloadedState: persistedState,
})

store.subscribe(() => {
    saveCartState(store.getState());
})
