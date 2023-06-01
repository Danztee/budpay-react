import { useState } from "react";
import BudPay from "budpay-react";

const AcceptPayment = () => {
  const config = {
    secret_key: "sk_test_3xd7ybrhumna6sn9kumn3eqljal6lghshb3uiu9",
    signature: "signature",
  };
  const budpay = new BudPay(config);
  const { acceptPayment } = budpay;

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

  const server2Server = async () => {
    const payload = {
      amount: "2",
      card: "83fa6763bb31bae36a74f787ab814514aeede91fcdb311fd67609b414c5e5ea2751a47870c8717e71bcbc9c33287a3d6af9ffae8e2edbf2de1e2694384d699b020d31492637eef60d7a63f303798363a",
      callback: "www.budpay.com",
      currency: "NGN",
      email: "test@email.com",
      pin: "1234",
      reference: "123253627873blsample29NEvccZzzl",
    };
    try {
      const res = await acceptPayment.serverToServer(payload);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const server2ServerBankTransfer = async () => {
    const payload = {
      email: "test@test.com",
      amount: "100",
      currency: "NGN",
      reference: "1253627873656276350",
      name: "Business Name / Firstname lastname",
    };

    try {
      const res = await acceptPayment.serverToServerBankTransferCheckout(
        payload
      );
      console.log(res);

      window.open(res.data.authorization_url, "_blank");
    } catch (error) {
      console.log(error);
    }
  };

  const server2ServerV2 = async () => {
    const payload = {
      amount: "100",
      card: "83fa6763bb31bae36a74f787ab814514aeede91fcdb311fd67609b414c5e5ea2751a47870c8717e71bcbc9c33287a3d6af9ffae8e2edbf2de1e2694384d699b020d31492637eef60d7a63f303798363a",
      currency: "USD",
      email: "test@email.com",
      reference: "1253627873656276350",
    };

    try {
      const res = await acceptPayment.serverToServerV2(payload);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const [refNum, setRefNum] = useState("BUD_16856160532115452403");
  const [id, setId] = useState("3421754");
  const [query, setQuery] = useState("12345");

  return (
    <>
      <h1>ACCEPT PAYMENT</h1>

      <section>
        <div>
          <h5>Standard Checkout</h5>
          <p>Total order is - NGN 25,000</p>
          <button onClick={checkout}>make payment</button>
        </div>

        <hr />

        <div>
          <h5>server 2 server</h5>
          <button onClick={server2Server}>Initialize Transaction</button>
        </div>

        <hr />

        <div>
          <h5>server 2 server bank transfer</h5>
          <button onClick={server2ServerBankTransfer}>
            Initialize Bank transfer
          </button>
        </div>

        <hr />

        <div>
          <h5>server 2 server V2</h5>
          <button onClick={server2ServerV2}>Initialize server2server v2</button>
        </div>
      </section>

      <section>
        <div>
          <h5>Verify Transaction with Reference number</h5>
          <input
            type="text"
            name=""
            id=""
            placeholder="reference number"
            value={refNum}
            onChange={(e) => setRefNum(e.target.value)}
          />
          <button
            onClick={async () => {
              const res = await acceptPayment.verifyTransaction(refNum);
              console.log(res);
            }}
          >
            verify
          </button>
        </div>

        <hr />

        <div>
          <h5>Fetch Single Transaction by query</h5>
          <input
            type="text"
            name=""
            id=""
            placeholder="query"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            onClick={async () => {
              const res = await acceptPayment.queryTransaction(query);
              console.log(res);
            }}
          >
            fetch
          </button>
        </div>

        <hr />

        <div>
          <h5>Fetch Single Transaction by id</h5>
          <input
            type="text"
            name=""
            id=""
            placeholder="id"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
          <button
            onClick={async () => {
              const res = await acceptPayment.fetchTransaction(id);
              console.log(res);
            }}
          >
            fetch transaction
          </button>
        </div>

        <hr />

        <div>
          <h5>get all transactions</h5>
          <button
            onClick={async () => {
              const res = await acceptPayment.fetchAllTransactions();
              console.log(res);
            }}
          >
            get all transactions
          </button>
        </div>
      </section>
    </>
  );
};
export default AcceptPayment;
