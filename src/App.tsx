import BudPay from ".";

const App = () => {
  const config = {
    secret_key: "your-secret-key",
    signature: "signature from config",
  };
  const budPay = new BudPay(config);

  const { billsPayment, acceptPayment } = budPay;
  acceptPayment.fetchAllTransactions().then((res) => console.log(res));

  billsPayment
    .airtimeTopUp("MTN", "08011111111", "100", "243rkei3wqqqw")
    .then((res) => console.log(res))
    .catch((err) => console.error(err));

  return <h1>BUDPAY</h1>;
};

export default App;
