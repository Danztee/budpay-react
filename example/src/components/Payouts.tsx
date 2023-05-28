import { useState } from "react";
import BudPay from "./BudPay";

const Payouts = () => {
  const budPay = new BudPay("YOUR_SECRET_KEY");
  const { payouts } = budPay;

  const [currency, setCurrency] = useState("");
  const [amount, setAmount] = useState("");
  const [bankCode, setBankCode] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [narration, setNarration] = useState("");
  const [paymentMode, setPaymentMode] = useState("");
  // const [reference, setReference] = useState("");
  const [loading, setLoading] = useState(false);

  const [fee, setFee] = useState("");
  const [feeValue, setFeeValue] = useState("");

  const [walletBal, setWalletBal] = useState("");

  const handlePayout = async () => {
    try {
      setLoading(true);

      const response = await payouts.singlePayout(
        currency,
        amount,
        bankCode,
        bankName,
        accountNumber,
        narration,
        paymentMode
        // reference
      );

      console.log(response);
      // Process the response or update state as needed

      setLoading(false);
    } catch (error) {
      console.log(error);
      // Handle any errors that occur during the payout request

      setLoading(false);
    }
  };

  return (
    <>
      <div>
        <h1>Single Payout</h1>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
            marginBottom: "1rem",
          }}
        >
          <label>
            Currency:
            <input
              type="text"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            />
          </label>

          <label>
            Amount:
            <input
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </label>

          <label>
            Bank Code:
            <input
              type="text"
              value={bankCode}
              onChange={(e) => setBankCode(e.target.value)}
            />
          </label>

          <label>
            Bank Name:
            <input
              type="text"
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
            />
          </label>

          <label>
            Account Number:
            <input
              type="text"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
            />
          </label>

          <label>
            Narration:
            <input
              type="text"
              value={narration}
              onChange={(e) => setNarration(e.target.value)}
            />
          </label>

          <label>
            Payment Mode:
            <input
              type="text"
              value={paymentMode}
              onChange={(e) => setPaymentMode(e.target.value)}
            />
          </label>
        </div>

        <button onClick={handlePayout} disabled={loading}>
          {loading ? "Processing..." : "Initiate Payout"}
        </button>
      </div>

      <hr />

      <div>
        <p>
          How much is my transfer fee for{" "}
          <input
            type="text"
            value={fee}
            onChange={(e) => setFee(e.target.value)}
          />
        </p>
        <button
          onClick={async () => {
            const res = await payouts.payoutFee("NGN", fee);
            console.log(res);
            setFeeValue(res.fee);
          }}
        >
          check
        </button>

        {feeValue && (
          <p>
            The fee for {fee} is {feeValue}
          </p>
        )}
      </div>

      <hr />

      <div>
        <p>how much do i have in my wallet presently?</p>
        <button
          onClick={async () => {
            const res = await payouts.walletBalance("NGN");
            setWalletBal(res.data.balance);
            console.log(res);
          }}
        >
          check
        </button>

        {walletBal && <p>you have {walletBal} currently</p>}
      </div>
    </>
  );
};

export default Payouts;
