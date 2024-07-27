export type InitialStateType = {
  balance: number;
  loan: number;
  loanPurpose: string;
};

export type ActionType =
  | { type: "account/deposit"; payload: number }
  | { type: "account/withdraw"; payload: number }
  | { type: "account/requestLoan"; payload: { amount: number; purpose: string } }
  | { type: "account/payLoan" };
