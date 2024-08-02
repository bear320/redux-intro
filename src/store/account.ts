import { Dispatch } from "redux";
import { AccountAction, AccountState } from "../types";

const initialState: AccountState = {
  isLoading: false,
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

const accountReducer = (state: AccountState = initialState, action: AccountAction): AccountState => {
  switch (action.type) {
    case "account/deposit":
      return { ...state, balance: state.balance + action.payload, isLoading: false };

    case "account/withdraw":
      if (state.balance - action.payload < 0) {
        throw new Error("Insufficient funds for withdrawal");
      }
      return { ...state, balance: state.balance - action.payload };

    case "account/requestLoan":
      if (state.loan > 0) return state;
      return {
        ...state,
        balance: state.balance + action.payload.amount,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
      };

    case "account/payLoan":
      return { ...state, balance: state.balance - state.loan, loan: 0, loanPurpose: "" };

    case "account/convertingCurrent":
      return { ...state, isLoading: true };

    default:
      return state;
  }
};

const deposit = (amount: number, currency: string) => {
  if (currency === "USD") return { type: "account/deposit", payload: amount };

  return async (dispatch: Dispatch<AccountAction>, getState: () => AccountState): Promise<void> => {
    dispatch({ type: "account/convertingCurrent" });
    const res = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`);
    const data = await res.json();
    const converted = data.rates.USD;

    dispatch({ type: "account/deposit", payload: converted });
  };
};

const withdraw = (amount: number): AccountAction => {
  return { type: "account/withdraw", payload: amount };
};

const requestLoan = (amount: number, purpose: string): AccountAction => {
  return { type: "account/requestLoan", payload: { amount, purpose } };
};

const payLoan = (): AccountAction => {
  return { type: "account/payLoan" };
};

export default accountReducer;
export { deposit, withdraw, requestLoan, payLoan };
