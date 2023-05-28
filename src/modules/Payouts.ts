import apiGetRequest from "../utils/apiGetRequest";
import apiSendRequest from "../utils/apiSendRequest";

class Payouts {
  #secret_key: string;

  constructor(secret_key: string) {
    this.#secret_key = secret_key;
  }

  #sendRequest = async (endpoint: string, data: object | string) => {
    return await apiSendRequest(endpoint, data, this.#secret_key);
  };

  #sendGetRequest = async (endpoint: string) => {
    return await apiGetRequest(endpoint, this.#secret_key);
  };

  bankLists = async (currency?: string) => {
    const endpoint = currency ? `bank_list/${currency}` : "bank_list";
    const response = this.#sendGetRequest(endpoint);
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
}

export default Payouts;
