import { useState } from "react";
import BudPay from "budpay-react";

const Payouts = () => {
  const config = {
    secret_key: "sk_test_3xd7ybrhumna6sn9kumn3eqljal6lghshb3uiu9",
    signature:
      "f8c6af33514f0a3150b1a8e2af164fdab7fdd59363d2db9830484beb56876bad3b226e35a7e0d93aa7946dddc5f87638206df3721dcc6007afb8a6d3a091b57c",
  };
  const budpay = new BudPay(config);
  const { payouts } = budpay;

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

      const data = {
        currency,
        amount,
        bank_code: bankCode,
        bank_name: bankName,
        account_number: accountNumber,
        narration,
        paymentMode,
        // reference
      };
      const response = await payouts.singlePayout(data);

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
      <h1>Payouts</h1>

      <div>
        <h5>Get bank lists</h5>
        <button
          onClick={async () => {
            const res = await payouts.bankLists("kes");
            console.log(res);
          }}
        >
          Get
        </button>
      </div>

      <hr />

      <div>
        <h5>initiate bulk payout</h5>
        <button
          onClick={async () => {
            const data = {
              currency: "NGN",
              transfers: [
                {
                  amount: "200",
                  bank_code: "000013",
                  bank_name: "GUARANTY TRUST BANK",
                  account_number: "0050883605",
                  narration: "January Salary",
                },
                {
                  amount: "100",
                  bank_code: "000013",
                  bank_name: "GUARANTY TRUST BANK",
                  account_number: "0050883605",
                  narration: "February  Salary",
                },
                {
                  amount: "100",
                  bank_code: "000013",
                  bank_name: "GUARANTY TRUST BANK",
                  account_number: "0050883605",
                  narration: "March  Salary",
                },
              ],
            };
            const res = await payouts.bulkPayout(data);
            console.log(res);
          }}
        >
          Initiate bulk transfer
        </button>
      </div>

      <hr />

      <div>
        <h5>verify payouts</h5>
        <button
          onClick={async () => {
            const res = await payouts.verifyPayout("trf_11044f068j1604");
            console.log(res);
          }}
        >
          verify
        </button>
      </div>

      <hr />

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
            const data = {
              currency: "NGN",
              amount: fee,
            };
            const res = await payouts.payoutFee(data);
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

      <hr />

      <div>
        <h5>Get wallet transactions</h5>
        <button
          onClick={async () => {
            const res = await payouts.walletTransactions("ngn");
            console.log(res);
          }}
        >
          Get
        </button>
      </div>
    </>
  );
};
export default Payouts;
