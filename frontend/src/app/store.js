import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import investmentReducer from "../features/investment/investmentSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    investment: investmentReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});
