import { useSelector } from "react-redux";
import { RootState } from "./types";
import AccountOperations from "./components/AccountOperations";
import Balance from "./components/Balance";
import CreateCustomer from "./components/CreateCustomer";
import Customer from "./components/Customer";

function App() {
  const { fullName } = useSelector((store: RootState) => store.customer);

  return (
    <div>
      <h1>🏦 The React-Redux Bank ⚛️</h1>
      {fullName === "" ? (
        <CreateCustomer />
      ) : (
        <>
          <Customer />
          <AccountOperations />
          <Balance />
        </>
      )}
    </div>
  );
}

export default App;
