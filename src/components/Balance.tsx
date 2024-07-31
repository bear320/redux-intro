// import { connect } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../types";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
  }).format(value);

// const Balance = ({ balance }) => {
//   return <div className="balance">{formatCurrency(balance)}</div>;
// };

// const mapStateToProps = (state: RootState) => {
//   return { balance: state.account.balance };
// };

// export default connect(mapStateToProps)(Balance);

const Balance = () => {
  const { balance } = useSelector((store: RootState) => store.account);
  return <div className="balance">{formatCurrency(balance)}</div>;
};

export default Balance;
