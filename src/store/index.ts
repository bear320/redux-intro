import { combineReducers, createStore } from "redux";
import accountReducer from "./account";
import customerReducer from "./customer";
export * from "./account";
export * from "./customer";

const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

const store = createStore(rootReducer);

export default store;
