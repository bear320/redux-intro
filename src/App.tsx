import AccountOperations from "./components/AccountOperations";
import Balance from "./components/Balance";
import CreateCustomer from "./components/CreateCustomer";
import Customer from "./components/Customer";
import store, { deposit, createCustomer } from "./store";

function App() {
  console.log(store.getState());
  store.dispatch(createCustomer("Oliver Xiong", "123456"));
  console.log(store.getState());
  store.dispatch(deposit(5000));
  console.log(store.getState());

  return (
    <div>
      <h1>🏦 The React-Redux Bank ⚛️</h1>
      <CreateCustomer />
      <Customer />
      <AccountOperations />
      <Balance />
    </div>
  );
}

export default App;
