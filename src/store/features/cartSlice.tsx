import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { ProductProps } from "../../types";

export interface CartItem {
  product: ProductProps;
  qty: number;
}

interface CartState {
  items: CartItem[];
}
const initialState: CartState = {
  items: [],
};

export const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const itemId = action.payload.product.id;
      const alreadyInCart = state.items.find((item) => item.product.id === itemId);
      if (alreadyInCart) {
        const amount = alreadyInCart.qty;
        alreadyInCart.qty = amount + action.payload.qty;
      } else {
        state.items.push(action.payload);
      }
      localStorage.setItem("myshop-cart", JSON.stringify(state.items));
    },
    decrementFromCart: (state, action: PayloadAction<CartItem>) => {
      const itemId = action.payload.product.id;
      const alreadyInCart = state.items.find((item) => item.product.id === itemId);
      if (alreadyInCart) {
        const amount = alreadyInCart.qty;
        alreadyInCart.qty = amount + -1;
      }
    },
    deleteFromCart: (state, action: PayloadAction<CartItem>) => {
      const itemId = action.payload.product.id;
      const filtered = state.items.filter((item) => item.product.id !== itemId);
      state.items = filtered;
    },
    clearCart: (state) => {
      state.items = [];
    },
    loadCart: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
    },
  },
});

export default CartSlice.reducer;
export const { addToCart, deleteFromCart, decrementFromCart, clearCart, loadCart } = CartSlice.actions;
export const selectCart = (state: RootState) => state.cart;
