import { AccountState } from "./account";
import { CustomerState } from "./customer";
export * from "./account";
export * from "./customer";

export type RootState = {
  account: AccountState;
  customer: CustomerState;
};
