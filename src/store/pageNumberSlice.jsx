import { createSlice } from "@reduxjs/toolkit";

const pageNumSlice = createSlice({
    name: "pageNumber",
    initialState: { page: null },
    reducers: {
        setPageNumber: (state, action) => {
            state.page = action.payload;
        }
    }
})

export const { setPageNumber } = pageNumSlice.actions;
export default pageNumSlice.reducer;