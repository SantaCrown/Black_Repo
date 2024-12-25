import { createSlice } from "@reduxjs/toolkit";

const swapSlice = createSlice({
    name: "swap",
    initialState: {
        account: '',
        value: ''
    },
    reducers: {
        setAccount: (state, action) => {
            state.account = action.payload;
        },
        setValue: (state, action) => {
            state.value = action.payload
        }
    },
});

export const {
    setAccount,
    setValue
} = swapSlice.actions;

export default swapSlice.reducer;
