import { createSlice } from "@reduxjs/toolkit";

const swapSlice = createSlice({
    name: "swap",
    initialState: {
        account: ''
    },
    reducers: {
        setAccount: (state, action) => {
            state.account = action.payload;
        },

    },
});

export const {
    setAccount,

} = swapSlice.actions;

export default swapSlice.reducer;
