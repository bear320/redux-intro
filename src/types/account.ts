export type AccountState = {
  isLoading: boolean;
  balance: number;
  loan: number;
  loanPurpose: string;
};

export type AccountAction =
  | { type: "account/deposit"; payload: number }
  | { type: "account/withdraw"; payload: number }
  | { type: "account/requestLoan"; payload: { amount: number; purpose: string } }
  | { type: "account/payLoan" }
  | { type: "account/convertingCurrent" };
