import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./features/account/accountSlice";
import customerReducer from "./features/customer/customerSlice";

const store = configureStore({
  reducer: {
    account: accountReducer,
    customer: customerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
