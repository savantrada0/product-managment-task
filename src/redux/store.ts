import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./product/productSlice";
import { useDispatch, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    products: productReducer,
  },
});

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;