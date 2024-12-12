import { configureStore } from "@reduxjs/toolkit";
import swapReducer from "./slices/swapSlice";

const store = configureStore({
  reducer: {
    swap: swapReducer,
  },
});

export default store;
