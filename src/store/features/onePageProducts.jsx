import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    pageProducts: [] // Массив id товаров одной страницы пагинации
};

const refreshProductsPage = createSlice({
    name: 'pageProducts',
    initialState,
    reducers: {
        updatePageProducts: (state, action) => {
            state.pageProducts = action.payload;
        }
    }
})

export const { updatePageProducts } = refreshProductsPage.actions;
export default refreshProductsPage.reducer;