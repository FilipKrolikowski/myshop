import { CartSlice } from "./features/cartSlice";
import { ProductsSlice } from "./features/productsSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    cart: CartSlice.reducer,
    products: ProductsSlice.reducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
