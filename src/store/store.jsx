import { configureStore } from "@reduxjs/toolkit";

import cartUpdateDataReducer, {loadCartState, saveCartState} from './features/dataCartUpdateSlice'
import updatePaginationPageNumberReducer from './features/paginationPageNumber'
import updatePageProductsReducer from './features/onePageProducts'

const persistedState = loadCartState();

export const store = configureStore({
    reducer: {
        updateData: cartUpdateDataReducer,
        updatePaginationPageNum: updatePaginationPageNumberReducer,
        updatePageProducts: updatePageProductsReducer,
    },
    preloadedState: persistedState,
})

store.subscribe(() => {
    saveCartState(store.getState());
})
