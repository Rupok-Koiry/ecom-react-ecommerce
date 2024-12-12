import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import comparisonReducer from "./comparisonSlice";

const store = configureStore({
  reducer: {
    comparison: comparisonReducer,
    cart: cartReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
