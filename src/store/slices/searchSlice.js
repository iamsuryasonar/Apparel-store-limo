import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    show: false,
};

const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        setShowSearch: (state, action) => {
            state.show = action.payload;
        },
    },
});

const { reducer, actions } = searchSlice;

export const { setShowSearch } = actions
export default reducer;