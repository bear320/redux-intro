const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
  }).format(value);

const Balance = () => {
  return <div className="balance">{formatCurrency(123456)}</div>;
};

export default Balance;
