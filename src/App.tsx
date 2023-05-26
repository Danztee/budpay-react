import Budpay from "./models/Budpay";

type AppProps = Record<string, never>;

const App: React.FC<AppProps> = () => {
  const budpay = new Budpay("sk_live_cswltnqwc2rp7dedhblxpxmuoaz880jgqmi92dz");
  const {
    // standardCheckout,
    // serverToServer,
    // serverToServerBankTransferCheckout,
    // serverToServerV2,
    verifyTransaction,
    fetchTransaction,
    queryTransaction,
    fetchAllTransactions,
    // requestPayment,
    // createPaymentLink,
    // createCustomer,

    // createDedicatedVirtualAccount,
    // listDedicatedVirtualAccount,
    // fetchDedicatedVirtualAccountById,
    // getSettlements,
    // getSettlementsByBatch,

    createRefund,
    listRefunds,
    fetchRefund,
    bankLists,
    accountNameVerify,
    singlePayout,
    bulkPayout,

    verifyPayout,

    payoutFee,
    walletBalance,
    walletTransactions,

    airtimeProviders,
    airtimeTopUp,
    internetProviders,
    internetDataPlans,
    internetDataPurchase,
    tvProviders,
    tvProviderPackages,
    tvSubscription,
    tvValidate,

    // getSettlementsByBatch,
    // listDedicatedVirtualAccountParam,
    // refund,
    // listRefunds,
    // fetchRefund,
  } = budpay;

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
      // await standardCheckout(
      //   "daniel@gmail.com",
      //   "20000",
      //   undefined,
      //   "12345",
      //   "callback_url"
      // );

      // const res = await serverToServer(
      //   "2",
      //   "83fa6763bb31bae36a74f787ab814514aeede91fcdb311fd67609b414c5e5ea2751a47870c8717e71bcbc9c33287a3d6af9ffae8e2edbf2de1e2694384d699b020d31492637eef60d7a63f303798363a",
      //   "www.budpay.com",
      //   "NGN",
      //   "test@email.com",
      //   "123253627873blsample29NEvccZzzl"
      //   // "1234"
      // );

      // const res = await serverToServerBankTransferCheckout(
      //   "test@test.com",
      //   "100",
      //   "NGN",
      //   "1253627873656276550",
      //   "Business Name / Firstname lastname"
      // );

      // const res = await serverToServerV2(
      //   "2",
      //   "83fa6763bb31bae36a74f787ab814514aeede91fcdb311fd67609b414c5e5ea2751a47870c8717e71bcbc9c33287a3d6af9ffae8e2edbf2de1e2694384d699b020d31492637eef60d7a63f303798363a",
      //   "olow@gmail.com",
      //   "qwqwwq",
      //   "USD"
      // );

      // const res = await verifyTransaction("61e469c330c2bc");

      //  const res = await fetchTransaction("3222075");

      // const res = await queryTransaction("1404612");

      // const res = await fetchAllTransactions();

      // const res = await requestPayment(
      //   "toluxsys@yahoo.ca,07036218209,sam@bud.africa,08161112404",
      //   "200",
      //   "NGN",
      //   "Testing Payment Request"
      // );

      // const res = await createPaymentLink(
      //   "2500",
      //   "NGN",
      //   "Name",
      //   "my description",
      //   "https://your_redirect_link"
      // );

      // const res = await createCustomer("dandw@email", "dan", "ddan");

      // const res = await createDedicatedVirtualAccount("CUS_3hqlcizuoffygev");

      // const res = await listDedicatedVirtualAccount();

      // const res = await fetchDedicatedVirtualAccountById("30128");

      // const res = await getSettlements();

      // const res = await getSettlementsByBatch("88833e9924709");

      // const res = await createRefund("BUD_4503320239329292929");

      // const res = await listRefunds();

      // const res = await fetchRefund("RF_shpfemttkvpvcoc");

      // const res = await bankLists("NGN");

      // const res = await accountNameVerify("000013", "0050883605");

      // const res = await singlePayout(
      //   "KES",
      //   "100",
      //   "000013",
      //   "GUARANTY TRUST BANK",
      //   "0050883605",
      //   "Test transfer",
      //   "momo"
      // );

      // const transfers = [
      //   {
      //     amount: "200",
      //     bank_code: "000013",
      //     bank_name: "GUARANTY TRUST BANK",
      //     account_number: "0050883605",
      //     narration: "January Salary",
      //   },
      //   {
      //     amount: "200",
      //     bank_code: "000013",
      //     bank_name: "GUARANTY TRUST BANK",
      //     account_number: "0050883605",
      //     narration: "January Salary",
      //   },
      //   {
      //     amount: "200",
      //     bank_code: "000013",
      //     bank_name: "GUARANTY TRUST BANK",
      //     account_number: "0050883605",
      //     narration: "January Salary",
      //   },
      // ];

      // const res = await bulkPayout("NGN", transfers);

      // const res = await verifyPayout("trf_11044f068j1604");

      // const res = await payoutFee("NGN", "100");

      // const res = await walletBalance("NGN");

      // const res = await walletTransactions("NGN");

      // const res = await airtimeProviders();

      // const res = await airtimeTopUp(
      //   "GLO",
      //   "08153537619",
      //   "100",
      //   "2459392959593939"
      // );

      // const res = await internetProviders();

      // const res = await internetDataPlans("MTN");

      // const res = await internetDataPurchase(
      //   "MTN",
      //   "08012345678",
      //   "38",
      //   "129483930293"
      // );

      // const res = await tvProviders();

      // const res = await tvProviderPackages("DSTV");

      // const res = await tvValidate("GOTV", "2019505346");

      // const res = await tvSubscription(
      //   "GOTV",
      //   "2019505346",
      //   "gotv-max",
      //   "20220511035554758"
      // );

      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }

  tryLibrary();
  return (
    <div>
      <h1>BUDPAY REACT LIBRARY</h1>
    </div>
  );
};
export default App;
