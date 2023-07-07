import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    pageNum: null
};

const updatePageNumber = createSlice({
    name: 'pageNum',
    initialState,
    reducers: {
        updatePaginationPageNumber: (state, action) => {
            if (action.payload === NaN) {
                state.pageNum = 1
            }
            
            state.pageNum = action.payload;
        }
    }
})

export const { updatePaginationPageNumber } = updatePageNumber.actions;
export default updatePageNumber.reducer;