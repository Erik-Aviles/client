import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./slices/cartSlice";
import checkoutSlice from "./slices/checkoutSlice";

//create a store and give it slices
export const store = configureStore({
  reducer: {
    cart: cartSlice,
    checkout: checkoutSlice,
  },
});
