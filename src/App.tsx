import BudPay from ".";

const App = () => {
  const config = {
    secret_key: "sk_test_3xd7ybrhumna6sn9kumn3eqljal6lghshb3uiu9",
    signature: "signature from config",
  };
  const budPay = new BudPay(config);

  const { billsPayment } = budPay;

  billsPayment
    .airtimeTopUp("MTN", "08011111111", "100", "243rkei3wqqqw")
    .then((res) => console.log(res))
    .catch((err) => console.error(err));

  return <h1>BUDPAY</h1>;
};

export default App;
