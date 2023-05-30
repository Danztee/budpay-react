import { useState } from "react";
import BudPay from "budpay-react";

const BillsPayment = () => {
  const config = {
    secret_key: "sk_test_3xd7ybrhumna6sn9kumn3eqljal6lghshb3uiu9",
    signature: "signature from config",
  };
  const budPay = new BudPay(config);

  const { billsPayment } = budPay;

  const [provider, setProvider] = useState("");
  const [number, setNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const handleProviderChange = (event) => {
    setProvider(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNumber(event.target.value);
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const randomNumber = Math.floor(
      100000000000000 + Math.random() * 900000000000000
    );
    const reference = String(randomNumber);

    try {
      const response = await billsPayment.airtimeTopUp(
        provider,
        number,
        amount,
        reference
      );

      console.log(response);
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  return (
    <div>
      <h1>Airtime Top-Up</h1>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="provider">Provider:</label>
          <input
            type="text"
            id="provider"
            value={provider}
            onChange={handleProviderChange}
            required
          />
        </div>
        <div>
          <label htmlFor="number">Phone Number:</label>
          <input
            type="text"
            id="number"
            value={number}
            onChange={handleNumberChange}
            required
          />
        </div>
        <div>
          <label htmlFor="amount">Amount:</label>
          <input
            type="text"
            id="amount"
            value={amount}
            onChange={handleAmountChange}
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Top-Up"}
        </button>
      </form>
    </div>
  );
};

export default BillsPayment;
