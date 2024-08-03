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
    createCustomer: {
      prepare: (fullName: string, nationalId: string) => ({
        payload: { fullName, nationalId, createdAt: new Date().toISOString() },
      }),
      reducer: (state, action: PayloadAction<{ fullName: string; nationalId: string; createdAt: string }>) => {
        state.fullName = action.payload.fullName;
        state.nationalId = action.payload.nationalId;
        state.createdAt = action.payload.createdAt;
      },
    },
    updateName: (state, action: PayloadAction<string>) => {
      state.fullName = action.payload;
    },
  },
});

export const { createCustomer, updateName } = customerSlice.actions;

export default customerSlice.reducer;
