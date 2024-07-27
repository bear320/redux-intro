import AccountOperations from "./components/AccountOperations";
import Balance from "./components/Balance";
import CreateCustomer from "./components/CreateCustomer";
import Customer from "./components/Customer";

function App() {
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
