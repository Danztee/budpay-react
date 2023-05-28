import apiGetRequest from "../utils/apiGetRequest";
import apiSendRequest from "../utils/apiSendRequest";

class AcceptPayment {
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
}

export default AcceptPayment;
