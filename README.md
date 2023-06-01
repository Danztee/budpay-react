# BUDPAY REACTJS LIBRARY

Whether you are building e-commerce applications, software-as-a-service platforms, or digital marketplaces using React, budpay-react helps you seamlessly integrate BudPay payment solution easily into your projects.

This library is fully written in typescript.

NOTE - you must pass the parameters correctly and accordingly. hover over the method name for detailed information

## INSTALLATION

To install the budpay-react, run the following command:

```javascript
npm install budpay-react

# or

yarn add budpay-react
```

## USAGE

NOTE: if you want to skip an optional parameter that is not required, you can pass `undefined` as the argument for that parameter. This allows you to move to the next optional parameter, if needed.

NB: all the required parameters are always before the OPTIONAL parameter.

To get a better understanding of the parameters and their order for each method, you can hover over the method name for detailed information.

### - Accept Payment

```javascript
import { useEffect } from "react";
import BudPay from "budpay-react";

const App = () => {
  const config = {
    secret_key: "your-secret-key",
    signature: "your-HMAC-Signature",
  };

  const budPay = new BudPay(config);

  const { acceptPayment } = budPay;

  const checkout = async () => {
    const payload = {
      email: "daniel@gmail.com",
      amount: "25000",
      callback: "yourcallbackurl",
    };
    try {
      const res = await acceptPayment.standardCheckout(payload);
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
export default App;
```

##### methods available in accept payment

- `standardCheckout(email, amount, currency, reference, callback)`
  &nbsp;
- `cardEncryption(data: {
  number: string;
  expiryMonth: string;
  expiryYear: string;
  cvv: string;
  pin?: string;
},
reference: string)`
  &nbsp;
- `serverToServer(amount, encryptedCard, callback, currency, email, reference, pin)`
  &nbsp;
- `serverToServerBankTransferCheckout(email, amount, reference, name, currency)`
  &nbsp;
- `serverToServerV2(amount, encryptedCard, email, reference, currency)`
  &nbsp;
- `verifyTransaction(reference)`
  &nbsp;
- `fetchTransaction(id)`
  &nbsp;
- `queryTransaction(search)`
  &nbsp;
- `fetchAllTransactions()`

### - Payment Features

```javascript
import { useState } from "react";
import BudPay from "budpay-react";

const App = () => {
  const config = {
    secret_key: "your-secret-key",
    signature: "your-HMAC-Signature",
  };

  const budPay = new BudPay(config);

  const { paymentFeatures } = budPay;

  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);

  const createPayment = async () => {
    setLoading(true);
    const data = {
      amount: "2500",
      currency: "NGN",
      name: "Name",
      description: "my description",
      redirect: "https://your_redirect_link",
    };
    try {
      const res = await paymentFeatures.createPaymentLink(data);
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

export default App;
```

##### methods available in payment features

- `requestPayment()`
  &nbsp;
- `createPaymentLink()`
  &nbsp;
- `createCustomer()`
  &nbsp;
- `createDedicatedVirtualAccount()`
  &nbsp;
- `listDedicatedVirtualAccount()`
  &nbsp;
- `fetchDedicatedVirtualAccountById()`
  &nbsp;
- `getSettlements()`
  &nbsp;
- `getSettlementsByBatch()`
  &nbsp;
- `createRefund()`
  &nbsp;
- `listRefunds()`
  &nbsp;
- `fetchRefund()`
  &nbsp;

### - Payouts

```javascript
import { useState } from "react";
import BudPay from "./BudPay";

const App = () => {
  const config = {
    secret_key: "your-secret-key",
    signature: "your-HMAC-Signature",
  };

  const budPay = new BudPay(config);

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

export default App;
```

##### methods available in payouts

- `bankLists()`
  &nbsp;

- `singlePayout()`
  &nbsp;

- `bulkPayout()`
  &nbsp;

- `verifyPayout()`
  &nbsp;

- `payoutFee()`
  &nbsp;

- `walletBalance()`
  &nbsp;

- `walletTransactions()`
  &nbsp;

### - Bills Payment

```javascript
import { useState } from "react";
import BudPay from "budpay-react";

const App = () => {
  const config = {
    secret_key: "your-secret-key",
    signature: "your-HMAC-Signature",
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

export default App;
```

##### methods available in bills payment

- `airtimeProviders()`
  &nbsp;
- `airtimeTopUp()`
  &nbsp;
- `internetProviders()`
  &nbsp;
- `internetDataPlans()`
  &nbsp;
- `internetDataPurchase()`
  &nbsp;
- `tvProviders()`
  &nbsp;
- `tvProviderPackages()`
  &nbsp;
- `tvValidate()`
  &nbsp;
- `tvSubscription()`
  &nbsp;
- `electricityProviders()`
  &nbsp;
- `electricityValidate()`
  &nbsp;
- `electricityRecharge()`
  &nbsp;

## License

This project is licensed under the MIT License. See the LICENSE file for details.

##### Author: Olowoniyi Daniel

##### Twitter - [link](https://twitter.com/iamdanztee)

##### Github - [link](https://github.com/Danztee)
