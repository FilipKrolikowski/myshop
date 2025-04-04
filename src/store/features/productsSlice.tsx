import { RootState } from "./../store";
import { createSlice } from "@reduxjs/toolkit";
import { ProductProps } from "../../types";
import { allStoreItems } from "../../utils";

interface ProductsState {
  items: ProductProps[];
}
const initialState: ProductsState = {
  items: allStoreItems,
};

export const ProductsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
});

export default ProductsSlice.reducer;

export const selectProducts = (state: RootState) => state.products;
