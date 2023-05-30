import { useEffect } from "react";
import BudPay from "budpay-react";

const AcceptPayment = () => {
  const config = {
    secret_key: "sk_test_3xd7ybrhumna6sn9kumn3eqljal6lghshb3uiu9",
    signature: "signature from config",
  };
  const budPay = new BudPay(config);

  const { acceptPayment } = budPay;

  const checkout = async () => {
    try {
      const res = await acceptPayment.standardCheckout(
        "daniel@gmail.com",
        "25000",
        undefined,
        undefined,
        "callback_url"
      );
      console.log(res);

      window.open(res.data.authorization_url, "_blank");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const transactions = await acceptPayment.fetchAllTransactions();
        console.log(transactions);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div>
      <h1>Standard Checkout</h1>
      <p>Total order is - NGN 25,000</p>
      <button onClick={checkout}>make payment</button>
    </div>
  );
};
export default AcceptPayment;
