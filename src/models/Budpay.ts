import apiRequest from "../utils";

class Budpay {
  #secret_key: string;

  constructor(secret_key: string) {
    this.#secret_key = secret_key;
  }

  #sendRequest = async (endpoint: string, payment_data: any) => {
    return await apiRequest(
      //
      endpoint,
      payment_data,
      this.#secret_key
    );
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

  serverToServer = async () => {
    const payment_data = {
      data: {
        number: "5123450000000008",
        expiryMonth: "10",
        expiryYear: "22",
        cvv: "100",
        pin: "1234",
      },
      reference: "1253627873656276350",
    };
    const endpoint = "transaction/initialize";
    const response = this.#sendRequest(endpoint, payment_data);
    return response;
  };

  serverToServerBankTransfer = async (
    email: string,
    amount: string,
    currency: string,
    name: string
  ) => {
    const payment_data = { email, amount, currency, name };
    const endpoint = "banktransfer/initialize";
    const response = this.#sendRequest(endpoint, payment_data);
    return response;
  };

  // VerifyTransaction = async (reference_number: string) => {
  //   const number = reference_number;
  //   const endpoint = "transaction/verify/";
  //   const response = this.#sendRequest(endpoint, number);
  //   return response;
  // };

  // PAYMENT FEATURES
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
