import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ICartState {
  items: any[];
  totalQuantity: number;
  totalPrice: number;
  couponApplied: boolean;
}

const initialState: ICartState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
  couponApplied: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<any>) => {
      const existingItem = state.items.find(
        (item) => item._id === action.payload._id
      );

      if (existingItem) {
        existingItem.quantity += 1;
        state.totalQuantity += 1;
        state.totalPrice += existingItem.price;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
        state.totalQuantity += 1;
        state.totalPrice += action.payload.price;
      }
    },
    removeItem: (state, action: PayloadAction<string>) => {
      const itemIndex = state.items.findIndex(
        (item) => item._id === action.payload
      );
      if (itemIndex !== -1) {
        const item = state.items[itemIndex];
        state.totalQuantity -= item.quantity;
        state.totalPrice -= item.price * item.quantity;
        state.items.splice(itemIndex, 1);
      }
    },
    incrementQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find((item) => item._id === action.payload);
      item.quantity += 1;
      state.totalQuantity += 1;
      state.totalPrice += item.price;
    },
    decrementQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find((item) => item._id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        state.totalQuantity -= 1;
        state.totalPrice -= item.price;
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
    applyCoupon: (state, action: PayloadAction<string>) => {
      if (action.payload === "GET20" && !state.couponApplied) {
        state.totalPrice = Number((state.totalPrice * 0.8).toFixed(2));
        state.couponApplied = true;
      }
    },
  },
});

export const {
  addItem,
  removeItem,
  incrementQuantity,
  decrementQuantity,
  clearCart,
  applyCoupon,
} = cartSlice.actions;

export default cartSlice.reducer;
