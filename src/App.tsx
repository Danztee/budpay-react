import BudPay from "./BudPay";

const App = () => {
  const budPay = new BudPay("sk_test_3xd7ybrhumna6sn9kumn3eqljal6lghshb3uiu9");

  const { acceptPayment } = budPay;
  acceptPayment
    .queryTransaction("BUD_1673600359168063493")
    .then((res) => console.log(res));

  return <h1>BUDPAY</h1>;
};

export default App;
