// import { createStore } from "redux";
import { AccountAction, AccountState } from "../types";

const initialState: AccountState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

const accountReducer = (state: AccountState = initialState, action: AccountAction): AccountState => {
  switch (action.type) {
    case "account/deposit":
      return { ...state, balance: state.balance + action.payload };

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

    default:
      return state;
  }
};

// const accountStore = createStore(accountReducer);

const deposit = (amount: number): AccountAction => {
  return { type: "account/deposit", payload: amount };
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

export { accountReducer, deposit, withdraw, requestLoan, payLoan };
