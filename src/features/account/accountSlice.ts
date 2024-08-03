import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type AccountState = {
  isLoading: boolean;
  balance: number;
  loan: number;
  loanPurpose: string;
};

const initialState: AccountState = {
  isLoading: false,
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    deposit: (state, action: PayloadAction<{ amount: number; currency: string }>) => {
      state.balance += action.payload.amount;
    },
    withdraw: (state, action: PayloadAction<number>) => {
      state.balance -= action.payload;
    },
    requestLoan: {
      prepare: (amount: number, purpose: string) => ({
        payload: { amount, purpose },
      }),
      reducer: (state, action: PayloadAction<{ amount: number; purpose: string }>) => {
        if (state.loan > 0) return;
        state.balance += action.payload.amount;
        state.loan = action.payload.amount;
        state.loanPurpose = action.payload.purpose;
      },
    },
    payLoan: (state) => {
      state.balance -= state.loan;
      state.loan = 0;
      state.loanPurpose = "";
    },
  },
});

export const { deposit, withdraw, requestLoan, payLoan } = accountSlice.actions;

export default accountSlice.reducer;
