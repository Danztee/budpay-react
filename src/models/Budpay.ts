import apiRequest from "../utils";

class Budpay {
  #secret_key: string;

  constructor(secret_key: string) {
    this.#secret_key = secret_key;
  }

  #sendRequest = async (
    endpoint: string,
    payment_data: object,
    url_link?: string
  ) => {
    return await apiRequest(endpoint, payment_data, this.#secret_key, url_link);
  };

  standardCheckout = async (
    email: string,
    amount: string,
    callback: string
  ) => {
    const payment_data = { email, amount, callback };
    const endpoint = "transaction/initialize";
    const response = this.#sendRequest(endpoint, payment_data);
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
    pin: string,
    reference: string
  ) => {
    const payment_data = {
      amount,
      card: encryptedCard,
      callback,
      currency,
      email,
      pin,
      reference,
    };
    const url_link = "https://api.budpay.com/api/s2s/";
    const endpoint = "transaction/initialize";
    const response = this.#sendRequest(endpoint, payment_data, url_link);
    return response;
  };

  serverToServerBankTransfer = async (
    email: string,
    amount: string,
    currency: string,
    reference: string,
    name: string
  ) => {
    const url_link = "https://api.budpay.com/api/s2s/";
    const payment_data = { email, amount, currency, reference, name };
    const endpoint = "banktransfer/initialize";
    const response = this.#sendRequest(endpoint, payment_data, url_link);
    return response;
  };

  serverToServerV2 = async (
    amount: string,
    encryptedCard: string,
    currency: string,
    email: string,
    reference: string
  ) => {
    const payment_data = {
      amount,
      card: encryptedCard,
      currency,
      email,
      reference,
    };
    const url_link = "https://api.budpay.com/api/s2s/v2/";
    const endpoint = "transaction/initialize";
    const response = this.#sendRequest(endpoint, payment_data, url_link);
    return response;
  };

  // PAYMENT FEATURES
  // *not working yet
  requestPayment = async (
    recipient: string,
    amount: string,
    currency: string,
    description: string
  ) => {
    const payment_data = { recipient, amount, currency, description };
    const endpoint = "request_payment";
    const response = this.#sendRequest(endpoint, payment_data);
    return response;
  };

  createPaymentLink = async (
    amount: string,
    currency: string,
    name: string,
    description: string,
    redirect: string
  ) => {
    const payment_data = { amount, currency, name, description, redirect };
    const endpoint = "create_payment_link";
    const response = this.#sendRequest(endpoint, payment_data);
    return response;
  };

  createCustomer = async (
    email: string,
    first_name: string,
    last_name: string,
    phone: string
  ) => {
    const payment_data = { email, first_name, last_name, phone };
    const endpoint = "customer";
    const response = this.#sendRequest(endpoint, payment_data);
    return response;
  };
}

export default Budpay;
