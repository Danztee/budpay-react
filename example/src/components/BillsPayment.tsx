import React, { useState } from "react";
import BudPay from "budpay-react";

const BillsPayment = () => {
  const config = {
    secret_key: "sk_test_3xd7ybrhumna6sn9kumn3eqljal6lghshb3uiu9",
    signature:
      "007f9eec650224f9f59b835f6ce762749a87a0f5e3a44f3d1ecc73091265cc7f585e41e970000e347e6233a0001f6e3e13ec59a70b60d123497ebd1ccdd362ae",
  };
  const budPay = new BudPay(config);

  const { billsPayment } = budPay;

  const [provider, setProvider] = useState("");
  const [number, setNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const handleProviderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProvider(event.target.value);
  };

  const handleNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNumber(event.target.value);
  };

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.value);
  };

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    try {
      const data = {
        provider,
        number,
        amount,
        reference: "2459392959593939",
      };
      const response = await billsPayment.airtimeTopUp(data);

      console.log(response);
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  return (
    <>
      <div>
        <h5>get all airtime providers</h5>
        <button
          onClick={async () => {
            const res = await billsPayment.airtimeProviders();
            console.log(res);
          }}
        >
          get
        </button>
      </div>

      <hr />
      <div>
        <h5>Airtime Top-Up</h5>
        <form onSubmit={handleFormSubmit}>
          <div style={{ marginBottom: "10px" }}>
            <label htmlFor="provider">Provider:</label>
            <input
              type="text"
              id="provider"
              value={provider}
              onChange={handleProviderChange}
              required
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label htmlFor="number">Phone Number:</label>
            <input
              type="text"
              id="number"
              value={number}
              onChange={handleNumberChange}
              required
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
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

      <hr />

      <div>
        <h5>get all internet providers</h5>
        <button
          onClick={async () => {
            const res = await billsPayment.internetProviders();
            console.log(res);
          }}
        >
          get
        </button>
      </div>

      <hr />

      <div>
        <h5>get all internet providers data plans</h5>
        <button
          onClick={async () => {
            const res = await billsPayment.internetDataPlans("GLO");
            console.log(res);
          }}
        >
          get
        </button>
      </div>

      <hr />

      <div>
        <h5>internet data purchase</h5>
        <button
          onClick={async () => {
            const data = {
              provider: "MTN",
              number: "07036218209",
              plan_id: "238",
              reference: "2459392959593939",
            };
            const res = await billsPayment.internetDataPurchase(data);
            console.log(res);
          }}
        >
          pay
        </button>
      </div>

      <hr />

      <div>
        <h5>get all tv providers</h5>
        <button
          onClick={async () => {
            const res = await billsPayment.tvProviders();
            console.log(res);
          }}
        >
          get
        </button>
      </div>

      <hr />

      <div>
        <h5>get a tv provider packages</h5>
        <button
          onClick={async () => {
            const res = await billsPayment.tvProviderPackages("GOTV");
            console.log(res);
          }}
        >
          get
        </button>
      </div>

      <hr />

      <div>
        <h5>tv validate</h5>
        <button
          onClick={async () => {
            const data = { provider: "GOTV", number: "2019505346" };
            const res = await billsPayment.tvValidate(data);
            console.log(res);
          }}
        >
          validate
        </button>
      </div>

      <hr />

      <div>
        <h5>tv subscription</h5>
        <button
          onClick={async () => {
            const data = {
              provider: "GOTV",
              number: "2019505346",
              code: "gotv-max",
              plan_id: "35",
              reference: "20220511035554758",
            };
            const res = await billsPayment.tvSubscription(data);
            console.log(res);
          }}
        >
          subscribe
        </button>
      </div>

      <hr />
      <div>
        <h5>get all electricity providers</h5>
        <button
          onClick={async () => {
            const res = await billsPayment.electricityProviders();
            console.log(res);
          }}
        >
          get
        </button>
      </div>

      <hr />
      <div>
        <h5>Electricity Validate</h5>
        <button
          onClick={async () => {
            const data = {
              provider: "IBEDC",
              type: "prepaid",
              number: "1111111111111",
            };
            const res = await billsPayment.electricityValidate(data);
            console.log(res);
          }}
        >
          validate
        </button>
      </div>

      <hr />
      <div>
        <h5>Electricity recharge</h5>
        <button
          onClick={async () => {
            const data = {
              provider: "IKEDC",
              number: "1111111111111",
              type: "prepaid",
              amount: "1000",
              reference: "2022051105275457530",
            };
            const res = await billsPayment.electricityRecharge(data);
            console.log(res);
          }}
        >
          recharge
        </button>
      </div>
    </>
  );
};

export default BillsPayment;
