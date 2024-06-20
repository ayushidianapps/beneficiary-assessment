import { configureStore } from "@reduxjs/toolkit";
import beneficiariesReducer from "./beneficiariesSlice";

export const store = configureStore({
  reducer: {
    beneficiaries: beneficiariesReducer,
  },
});
