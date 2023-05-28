import apiGetRequest from "../utils/apiGetRequest";
import apiSendRequest from "../utils/apiSendRequest";

class PaymentFeatures {
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
}

export default PaymentFeatures;
