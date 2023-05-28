import { useEffect, useState } from "react";
import BudPay from "./BudPay";

const App = () => {
  const budPay = new BudPay("sk_test_3xd7ybrhumna6sn9kumn3eqljal6lghshb3uiu9");

  const { billsPayment, paymentFeatures, acceptPayment } = budPay;

  return <h1>hi</h1>;
};

export default App;
