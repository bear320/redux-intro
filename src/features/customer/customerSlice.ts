import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type CustomerState = {
  fullName: string;
  nationalId: string;
  createdAt: string;
};

const initialState: CustomerState = {
  fullName: "",
  nationalId: "",
  createdAt: "",
};

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    createCustomer: (state, action: PayloadAction<{ fullName: string; nationalId: string }>) => {
      state.fullName = action.payload.fullName;
      state.nationalId = action.payload.nationalId;
      state.createdAt = new Date().toISOString();
    },
    updateName: (state, action: PayloadAction<string>) => {
      state.fullName = action.payload;
    },
  },
});

export const { createCustomer, updateName } = customerSlice.actions;

export default customerSlice.reducer;
