import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import investmentReducer from "../features/investment/investmentSlice";
import investmentDetailReducer from "../features/investmentDetail/investmentDetailSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    investment: investmentReducer,
    investmentDetail: investmentDetailReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});
