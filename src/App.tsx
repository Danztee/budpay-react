import Budpay from "./models/Budpay";

type AppProps = Record<string, never>;

const App: React.FC<AppProps> = () => {
  const budpay = new Budpay("12345");

  budpay.requestPayment(
    "olowoniyidan@gmail.com,08153537619",
    "200",
    "NGN",
    "Testing Payment Request"
  );

  return <div></div>;
};
export default App;
