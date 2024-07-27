import { createStore } from "redux";
import { ActionType, InitialStateType } from "./types";

const initialState: InitialStateType = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

const reducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
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

const store = createStore(reducer);

store.dispatch({ type: "account/deposit", payload: 1000 });
console.log(store.getState());

store.dispatch({ type: "account/withdraw", payload: 200 });
console.log(store.getState());

store.dispatch({ type: "account/requestLoan", payload: { amount: 500, purpose: "Buy a car" } });
console.log(store.getState());

store.dispatch({ type: "account/payLoan" });
console.log(store.getState());
