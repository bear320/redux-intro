import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../types";
import { deposit, payLoan, requestLoan, withdraw } from "../store";

const AccountOperations = () => {
  const [depositAmount, setDepositAmount] = useState(0);
  const [withdrawAmount, setWithdrawAmount] = useState(0);
  const [loanAmount, setLoanAmount] = useState(0);
  const [loanPurpose, setLoanPurpose] = useState("");
  const [currency, setCurrency] = useState("USD");

  const {
    isLoading,
    balance,
    loan: currentLoan,
    loanPurpose: currentLoanPurpose,
  } = useSelector((store: RootState) => store.account);
  const dispatch = useDispatch();

  const handleDeposit = () => {
    if (depositAmount > 0) {
      dispatch(deposit(depositAmount, currency));
      setDepositAmount(0);
      setCurrency("USD");
    }
  };

  const handleWithdraw = () => {
    if (withdrawAmount > 0 && withdrawAmount <= balance) {
      dispatch(withdraw(withdrawAmount));
      setWithdrawAmount(0);
    }
  };

  const handleRequestLoan = () => {
    if (loanAmount > 0 && loanPurpose) {
      dispatch(requestLoan(loanAmount, loanPurpose));
      setLoanAmount(0);
      setLoanPurpose("");
    }
  };

  const handlePayLoan = () => {
    dispatch(payLoan());
  };

  return (
    <div>
      <h2>Your account operations</h2>
      <div className="inputs">
        <div>
          <label>Deposit</label>
          <input type="number" value={depositAmount} onChange={(e) => setDepositAmount(+e.target.value)} />
          <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
            <option value="USD">US Dollar</option>
            <option value="EUR">Euro</option>
            <option value="GBP">British Pound</option>
          </select>

          <button disabled={isLoading} onClick={handleDeposit}>
            {isLoading ? "Converting" : `Deposit ${depositAmount}`}
          </button>
        </div>

        <div>
          <label>Withdraw</label>
          <input type="number" value={withdrawAmount} onChange={(e) => setWithdrawAmount(+e.target.value)} />
          <button onClick={handleWithdraw}>Withdraw {withdrawAmount}</button>
        </div>

        <div>
          <label>Request loan</label>
          <input
            type="number"
            value={loanAmount}
            onChange={(e) => setLoanAmount(+e.target.value)}
            placeholder="Loan amount"
          />
          <input value={loanPurpose} onChange={(e) => setLoanPurpose(e.target.value)} placeholder="Loan purpose" />
          <button onClick={handleRequestLoan}>Request loan</button>
        </div>

        {currentLoan > 0 && (
          <div>
            <span>
              Pay back ${currentLoan} ({currentLoanPurpose}){" "}
            </span>
            <button onClick={handlePayLoan}>Pay loan</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountOperations;
