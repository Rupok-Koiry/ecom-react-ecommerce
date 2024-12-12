import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ComparisonState {
  products: any[];
}

const initialState: ComparisonState = {
  products: [],
};
const comparisonSlice = createSlice({
  name: "comparison",
  initialState,
  reducers: {
    addProductToCompare: (state, action: PayloadAction<any>) => {
      state.products.push(action.payload);
    },
    removeProductFromCompare: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter(
        (product: any) => product._id !== action.payload
      );
    },
    clearComparison: (state) => {
      state.products = [];
    },
  },
});

export const {
  addProductToCompare,
  removeProductFromCompare,
  clearComparison,
} = comparisonSlice.actions;

export default comparisonSlice.reducer;
