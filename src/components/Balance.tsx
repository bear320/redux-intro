import { useSelector } from "react-redux";
import { RootState } from "../store";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
  }).format(value);

const Balance = () => {
  const { balance } = useSelector((store: RootState) => store.account);
  return <div className="balance">{formatCurrency(balance)}</div>;
};

export default Balance;
