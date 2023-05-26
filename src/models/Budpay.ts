import apiSendRequest, { apiGetRequest } from "../utils";

class Budpay {
  #secret_key: string;

  constructor(secret_key: string) {
    this.#secret_key = secret_key;
  }

  #sendRequest = async (
    endpoint: string,
    data: object | string,
    url_link?: string
  ) => {
    return await apiSendRequest(endpoint, data, this.#secret_key, url_link);
  };

  #sendGetRequest = async (endpoint: string, url_link?: string) => {
    return await apiGetRequest(endpoint, this.#secret_key, url_link);
  };

  /*
  =============== 
  ACCEPT PAYMENT 
  ===============
  */

  standardCheckout = async (
    email: string,
    amount: string,
    currency?: string,
    reference?: string,
    callback?: string
  ) => {
    const data = { email, amount, currency, reference, callback };
    const endpoint = "transaction/initialize";
    const response = this.#sendRequest(endpoint, data);
    return response;
  };

  cardEncryption = async (card_details: object) => {
    const endpoint = "test/encryption";
    const response = this.#sendRequest(endpoint, card_details);
    return response;
  };

  serverToServer = async (
    amount: string,
    encryptedCard: string,
    callback: string,
    currency: string,
    email: string,
    reference: string,
    pin?: string
  ) => {
    const data = {
      amount,
      card: encryptedCard,
      callback,
      currency,
      email,
      reference,
      pin,
    };
    const url_link = "https://api.budpay.com/api/s2s/";
    const endpoint = "transaction/initialize";
    const response = this.#sendRequest(endpoint, data, url_link);
    return response;
  };

  serverToServerBankTransferCheckout = async (
    email: string,
    amount: string,
    reference: string,
    name: string,
    currency: string
  ) => {
    const url_link = "https://api.budpay.com/api/s2s/";
    const data = { email, amount, currency, reference, name };
    const endpoint = "banktransfer/initialize";
    const response = this.#sendRequest(endpoint, data, url_link);
    return response;
  };

  serverToServerV2 = async (
    amount: string,
    encryptedCard: string,
    email: string,
    reference: string,
    currency?: string
  ) => {
    const data = {
      amount,
      card: encryptedCard,
      email,
      reference,
      currency,
    };
    const url_link = "https://api.budpay.com/api/s2s/v2/";
    const endpoint = "transaction/initialize";
    const response = this.#sendRequest(endpoint, data, url_link);
    return response;
  };

  verifyTransaction = async (reference: string) => {
    const endpoint = `transaction/verify/:${reference}`;
    const response = this.#sendGetRequest(endpoint);
    return response;
  };

  fetchTransaction = async (id: string) => {
    const endpoint = `transaction/:${id}`;
    const response = this.#sendGetRequest(endpoint);
    return response;
  };

  // not working yet
  queryTransaction = async (search: string) => {
    const endpoint = `transaction_query/:${search}`;
    const response = this.#sendGetRequest(endpoint);
    return response;
  };

  fetchAllTransactions = async () => {
    const endpoint = "transaction";
    const response = this.#sendGetRequest(endpoint);
    return response;
  };

  /*
  =============== 
  PAYMENT FEATURES
  ===============
  */

  // *not working yet
  requestPayment = async (
    recipient: string,
    amount: string,
    currency: string,
    description: string
  ) => {
    const data = { recipient, amount, currency, description };
    const endpoint = "request_payment";
    const response = this.#sendRequest(endpoint, data);
    return response;
  };

  createPaymentLink = async (
    amount: string,
    currency: string,
    name: string,
    description: string,
    redirect: string
  ) => {
    const data = { amount, currency, name, description, redirect };
    const endpoint = "create_payment_link";
    const response = this.#sendRequest(endpoint, data);
    return response;
  };

  createCustomer = async (
    email: string,
    first_name: string,
    last_name: string,
    phone?: string,
    metadata?: string
  ) => {
    const data = { email, first_name, last_name, phone, metadata };
    const endpoint = "customer";
    const response = this.#sendRequest(endpoint, data);
    return response;
  };

  createDedicatedVirtualAccount = async (
    customer: string,
    first_name?: string,
    last_name?: string,
    phone?: string
  ) => {
    const data = { customer, first_name, last_name, phone };
    const endpoint = "dedicated_virtual_account";
    const response = this.#sendRequest(endpoint, data);
    return response;
  };

  listDedicatedVirtualAccount = async () => {
    const endpoint = "list_dedicated_accounts";
    const response = this.#sendGetRequest(endpoint);
    return response;
  };

  fetchDedicatedVirtualAccountById = async (id: string) => {
    const endpoint = `dedicated_account/:${id}`;
    const response = this.#sendGetRequest(endpoint);
    return response;
  };

  getSettlements = async () => {
    const endpoint = "settlement";
    const response = this.#sendGetRequest(endpoint);
    return response;
  };

  getSettlementsByBatch = async (batchId: string) => {
    const endpoint = `settlement/details/:${batchId}`;
    const response = this.#sendGetRequest(endpoint);
    return response;
  };

  createRefund = async (
    reference: string,
    customer_note?: string,
    merchant_note?: string
  ) => {
    const data = { reference, customer_note, merchant_note };
    const endpoint = "refund";
    const response = this.#sendRequest(endpoint, data);
    return response;
  };

  listRefunds = async () => {
    const endpoint = "refund";
    const response = this.#sendGetRequest(endpoint);
    return response;
  };

  fetchRefund = async (reference: string) => {
    const endpoint = `refund/status/:${reference}`;
    const response = this.#sendGetRequest(endpoint);
    return response;
  };

  /*
  =============== 
  PAYOUT
  ===============
  */

  bankLists = async (currency?: string) => {
    const endpoint = currency ? `bank_list/${currency}` : "bank_list";
    const response = this.#sendGetRequest(endpoint);
    return response;
  };

  // *not working
  accountNameVerify = async (
    bank_code: string,
    account_number: string,
    currency?: string
  ) => {
    const data = { bank_code, account_number, currency };
    const endpoint = "account_name_verify";
    const response = this.#sendRequest(endpoint, data);
    return response;
  };

  singlePayout = async (
    currency: string,
    amount: string,
    bank_code: string,
    bank_name: string,
    account_number: string,
    narration: string,
    paymentMode?: string,
    reference?: string
  ) => {
    const data = {
      currency,
      amount,
      bank_code,
      bank_name,
      account_number,
      narration,
      paymentMode,
      reference,
    };
    const endpoint = "bank_transfer";
    const response = this.#sendRequest(endpoint, data);
    return response;
  };

  bulkPayout = async (
    currency: string,
    transfers: {
      amount: string;
      bank_code: string;
      bank_name: string;
      account_number: string;
      narration: string;
      reference?: string;
    }[]
  ) => {
    const data = { currency, transfers };

    console.log(data);

    const endpoint = "bulk_bank_transfer";
    const response = this.#sendRequest(endpoint, data);
    return response;
  };

  verifyPayout = async (reference: string) => {
    const endpoint = `payout/:${reference}`;
    const response = this.#sendGetRequest(endpoint);
    return response;
  };

  payoutFee = async (currency: string, amount: string) => {
    const data = { currency, amount };
    const endpoint = "payout_fee";
    const response = this.#sendRequest(endpoint, data);
    return response;
  };

  walletBalance = async (currency: string) => {
    const endpoint = `wallet_balance/${currency}`;
    const response = this.#sendGetRequest(endpoint);
    return response;
  };

  walletTransactions = async (currency: string) => {
    const endpoint = `wallet_transactions/${currency}`;
    const response = this.#sendGetRequest(endpoint);
    return response;
  };

  /*
  =============== 
  BILLS PAYMENT
  ===============
  */

  airtimeProviders = async () => {
    const endpoint = "airtime";
    const response = this.#sendGetRequest(endpoint);
    return response;
  };

  airtimeTopUp = async (
    provider: string,
    number: string,
    amount: string,
    reference: string
  ) => {
    const data = { provider, number, amount, reference };
    const endpoint = "airtime/topup";
    const response = this.#sendRequest(endpoint, data);
    return response;
  };

  internetProviders = async () => {
    const endpoint = "internet";
    const response = this.#sendGetRequest(endpoint);
    return response;
  };

  internetDataPlans = async (provider: string) => {
    const endpoint = `internet/plans/${provider}`;
    const response = this.#sendGetRequest(endpoint);
    return response;
  };

  internetDataPurchase = async (
    provider: string,
    number: string,
    plan_id: string,
    reference: string
  ) => {
    const data = { provider, number, plan_id, reference };
    const endpoint = "internet/data";
    const response = this.#sendRequest(endpoint, data);
    return response;
  };

  tvProviders = async () => {
    const endpoint = "tv";
    const response = this.#sendGetRequest(endpoint);
    return response;
  };

  tvProviderPackages = async (provider: string) => {
    const endpoint = `tv/packages/${provider}`;
    const response = this.#sendGetRequest(endpoint);
    return response;
  };

  tvValidate = async (provider: string, number: string) => {
    const data = { provider, number };
    const endpoint = "tv/validate";
    const response = this.#sendRequest(endpoint, data);
    return response;
  };

  tvSubscription = async (
    provider: string,
    number: string,
    plan_id: string,
    reference: string
  ) => {
    const data = { provider, number, code: plan_id, reference };
    const endpoint = "tv/pay";
    const response = this.#sendRequest(endpoint, data);
    return response;
  };
}

export default Budpay;
