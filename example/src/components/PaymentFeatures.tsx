import BudPay from "budpay-react";

const PaymentFeatures = () => {
  const config = {
    secret_key: "sk_test_3xd7ybrhumna6sn9kumn3eqljal6lghshb3uiu9",
    signature: "signature",
  };
  const budpay = new BudPay(config);
  const { paymentFeatures } = budpay;

  return (
    <>
      <h1>PAYMENT FEATURES</h1>
      <div>
        <h5>create payment link</h5>
        <button
          onClick={async () => {
            const data = {
              amount: "2500",
              currency: "NGN",
              name: "Name",
              description: "my description",
              redirect: "https://your_redirect_link",
            };
            const res = await paymentFeatures.createPaymentLink(data);
            console.log(res);
          }}
        >
          create
        </button>
      </div>

      <hr />

      <div>
        <h5>create customer</h5>
        <button
          onClick={async () => {
            const data = {
              email: "zero@budpay.com",
              first_name: "Zero",
              last_name: "Sum",
              phone: "+2348123456789",
            };
            const res = await paymentFeatures.createCustomer(data);
            console.log(res);
          }}
        >
          create customer
        </button>
      </div>

      <hr />

      <div>
        <h5>create customer</h5>
        <button
          onClick={async () => {
            const data = { customer: "CUS_3hqlcizuoffygev" };
            const res = await paymentFeatures.createDedicatedVirtualAccount(
              data
            );
            console.log(res);
          }}
        >
          create dedicated virtual account
        </button>
      </div>
      <div>
        <h5>list dedicated virtual account</h5>

        <button
          onClick={async () => {
            const res = await paymentFeatures.listDedicatedVirtualAccount();
            console.log(res);
          }}
        >
          list
        </button>
      </div>
      <hr />
      <div>
        <h5>fetch dedicated virtual account by id</h5>
        <button
          onClick={async () => {
            const res = await paymentFeatures.fetchDedicatedVirtualAccountById(
              "36696"
            );
            console.log(res);
          }}
        >
          fetch
        </button>
      </div>
      <hr />
      <div>
        <h5>get settlements</h5>

        <button
          onClick={async () => {
            const res = await paymentFeatures.getSettlements();
            console.log(res);
          }}
        >
          get
        </button>
      </div>
      <hr />
      <div>
        <h5>get settlements by batch id</h5>
        <button
          onClick={async () => {
            const res = await paymentFeatures.getSettlementsByBatch(
              "d16a52882c203"
            );
            console.log(res);
          }}
        >
          get
        </button>
      </div>
      <hr />
      <div>
        <h5>create refund</h5>
        <button
          onClick={async () => {
            const data = {
              reference: "BUD_4503320239329292929",
            };
            const res = await paymentFeatures.createRefund(data);
            console.log(res);
          }}
        >
          create
        </button>
      </div>
      <hr />
      <div>
        <h5>list all refunds</h5>

        <button
          onClick={async () => {
            const res = await paymentFeatures.listRefunds();
            console.log(res);
          }}
        >
          list
        </button>
      </div>
      <hr />
      <div>
        <h5>fetch refund</h5>
        <button
          onClick={async () => {
            const res = await paymentFeatures.fetchRefund("d16a52882c203");
            console.log(res);
          }}
        >
          fetch
        </button>
      </div>
    </>
  );
};
export default PaymentFeatures;
