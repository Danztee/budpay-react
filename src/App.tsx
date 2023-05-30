import BudPay from ".";

const App = () => {
  const budPay = new BudPay("your-key");

  const { acceptPayment } = budPay;
  acceptPayment
    .queryTransaction("BUD_1673600359168063493")
    .then((res) => console.log(res));

  return <h1>BUDPAY</h1>;
};

export default App;
