import { useState } from "react";
import BudPay from "budpay-react";

const PaymentFeatures = () => {
  const budPay = new BudPay("YOUR_SECRET_KEY");

  const { paymentFeatures } = budPay;

  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);

  const createPayment = async () => {
    setLoading(true);
    try {
      const res = await paymentFeatures.createPaymentLink(
        "2500",
        "NGN",
        "Daniel",
        "my description",
        "https://your_redirect_link"
      );
      setLink(res.data.payment_link);
      console.log(res);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Payment Features</h1>

      <button onClick={createPayment}>Create Payment Link</button>

      {loading && <p>Your payment link is loading...</p>}

      {!loading && link && (
        <a href={link} target="_blank" rel="noopener noreferrer">
          {link}
        </a>
      )}
    </div>
  );
};

export default PaymentFeatures;
