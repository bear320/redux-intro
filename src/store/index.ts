import { combineReducers, createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import accountReducer from "./account";
import customerReducer from "./customer";
export * from "./account";
export * from "./customer";

const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
