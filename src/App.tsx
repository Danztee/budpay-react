import Budpay from "./models/Budpay";

type AppProps = Record<string, never>;

const App: React.FC<AppProps> = () => {
  const budpay = new Budpay("sk_test_3xd7ybrhumna6sn9kumn3eqljal6lghshb3uiu9");
  const { createCustomer } = budpay;

  // const card_details = {
  //   data: {
  //     number: "5123450000000008",
  //     expiryMonth: "10",
  //     expiryYear: "22",
  //     cvv: "100",
  //     pin: "1234",
  //   },
  //   reference: "1253627873656276350",
  // };

  async function tryLibrary() {
    try {
      const res = await createCustomer(
        "zerowqa@budpay.com",
        "Zero",
        "Sum",
        "+2348123456789"
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }

  tryLibrary();
  return (
    <div>
      <h1 className="">BUILDING PAYMENT INFRASTRUCTURE</h1>
    </div>
  );
};
export default App;
