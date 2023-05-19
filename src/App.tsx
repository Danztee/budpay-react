export default function App() {
  const data = { email: "customer@email.com", amount: "20000" };

  const makePayment = async () => {
    const res = await fetch(
      "https://api.budpay.com/api/v2/transaction/initialize",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer 123456`,
        },
        body: JSON.stringify(data),
      }
    );
    const response = await res.json();

    console.log(response);
  };

  return (
    <>
      <button onClick={makePayment}>make payment</button>
    </>
  );
}
