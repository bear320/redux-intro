import { createStore } from "redux";
import { CustomerState, CustomerAction } from "../types";

const initialState: CustomerState = {
  fullName: "",
  nationalId: "",
  createdAt: "",
};

const customerReducer = (state: CustomerState = initialState, action: CustomerAction): CustomerState => {
  switch (action.type) {
    case "customer/create":
      return { ...state, ...action.payload };

    case "customer/updateName":
      return { ...state, fullName: action.payload };

    default:
      return state;
  }
};

// const customerStore = createStore(customerReducer);

const createCustomer = (fullName: string, nationalId: string): CustomerAction => {
  return { type: "customer/create", payload: { fullName, nationalId, createdAt: new Date().toISOString() } };
};

const updateName = (fullName: string): CustomerAction => {
  return { type: "customer/updateName", payload: fullName };
};

export { customerReducer, createCustomer, updateName };
