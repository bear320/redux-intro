import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../../store";

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
      state.isLoading = false;
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
    convertCurrency: (state) => {
      state.isLoading = true;
    },
  },
});

export const deposit = (
  amount: number,
  currency: string
):
  | { type: "account/deposit"; payload: { amount: number; currency: string } }
  | ((dispatch: AppDispatch, getState: () => AccountState) => Promise<void>) => {
  if (currency === "USD") return { type: "account/deposit", payload: { amount, currency } };

  return async (dispatch: AppDispatch, getState: () => AccountState): Promise<void> => {
    dispatch({ type: "account/convertCurrency" });
    const res = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`);
    const data = await res.json();
    const converted = data.rates.USD;

    dispatch({ type: "account/deposit", payload: { amount: converted, currency: "USD" } });
  };
};

export const { withdraw, requestLoan, payLoan } = accountSlice.actions;

export default accountSlice.reducer;
