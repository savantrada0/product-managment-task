import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { Product, ProductState } from "../../types/product";
import uuid from "react-uuid";

const initialState: ProductState = {
  products: [],
  loading: true,
  error: "",
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    getProducts: (state) => {
      state.loading = true;
      const localItems = localStorage.getItem("products") || "";
      const products = JSON.parse(localItems);
      state.products = products;
      state.loading = false;
    },
    addProduct: (state, action: PayloadAction<Product>) => {
      const old = state.products;
      const newP = { ...action.payload, id: uuid() };
      old.push(newP);
      localStorage.setItem("products", JSON.stringify(old));
    },
    editProduct: (state, action: PayloadAction<Product>) => {
      const old = state.products;
      const newProducts = old.map((item: Product) => {
        if (item.id === action.payload.id) {
          return action.payload;
        } else {
          return item;
        }
      });
      localStorage.setItem("products", JSON.stringify(newProducts));
    },
    deleteProduct: (state, action: PayloadAction<any>) => {
      const old = state.products;
      const newProducts = old.filter((item: Product) => {
        return item.id !== action.payload.id;
      });
      localStorage.setItem("products", JSON.stringify(newProducts));
    },
  },
});

export const { getProducts, addProduct, editProduct, deleteProduct } =
  productSlice.actions;

export default productSlice.reducer;
