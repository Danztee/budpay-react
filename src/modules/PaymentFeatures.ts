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

  /**
   * The Payment request API allows you create a payment and send payment link directly to customer email or phone directly on your integration.
   * @deprecated - not working yet
   * @param {string} recipient - payment recipients. to be separated by "," phone number and emails mixture allowed.
   * @param {string} amount - Payment Amount.
   * @param {string} currency - payment currency.
   * @param {string} description - payment description.
   * @returns {Promise<any>} - A Promise that resolves to the response from the API.
   * @deprecated This feature is not working yet.
   */
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

  /**
   * The Payment link API allows you create a payment link directly on your integration.
   * @param {string} amount - Payment Amount.
   * @param {string} currency - currency.
   * @param {string} name - Customer's fullname name.
   * @param {string} description - The description for the payment link.
   * @param {string} redirect - redirect url.
   * @returns {Promise<any>} - A Promise that resolves to the response from the API.
   */
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

  /**
   * The Customers API allows you create and manage customers on your integration.
   * @param {string} email - Customer's email address.
   * @param {string} first_name - Customer's first name.
   * @param {string} last_name - Customer's last name.
   * @param {string} phone [OPTIONAL] - Customer's phone number.
   * @param {string} metadata [OPTIONAL] - A set of key/value pairs that you can attach to the customer. It can be used to store additional information in a structured format.
   * @returns {Promise<any>} - A Promise that resolves to the response from the API.
   */
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

  /**
   * Create a dedicated virtual account and assign to a customer.
   * @param {string} customer - Customer code.
   * @param {string} first_name [OPTIONAL] - Customer's first name.
   * @param {string} last_name [OPTIONAL] - Customer's last name.
   * @param {string} phone [OPTIONAL] - Customer's phone number.
   * @returns {Promise<any>} - A Promise that resolves to the response from the API.
   */
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

  /**
   * List dedicated virtual accounts available on your integration..
   * @returns {Promise<any>} - A Promise that resolves to the response from the API.
   */
  listDedicatedVirtualAccount = async () => {
    const endpoint = "list_dedicated_accounts";
    const response = this.#sendGetRequest(endpoint);
    return response;
  };

  /**
   * Get details of a dedicated virtual account on your integration.
   * @param {string} id - The ID of the dedicated virtual account.
   * @returns {Promise<any>} - A Promise that resolves to the response from the API.
   */
  fetchDedicatedVirtualAccountById = async (id: string) => {
    const endpoint = `dedicated_account/:${id}`;
    const response = this.#sendGetRequest(endpoint);
    return response;
  };

  /**
   * List all your business Settlements.
   * @returns {Promise<any>} - A Promise that resolves to the response from the API.
   */
  getSettlements = async () => {
    const endpoint = "settlement";
    const response = this.#sendGetRequest(endpoint);
    return response;
  };

  /**
   * Get details of a Settlement with all transactions of that settlement.
   * @param {string} batchId - settlement batchid.
   * @returns {Promise<any>} - A Promise that resolves to the response from the API.
   */
  getSettlementsByBatch = async (batchId: string) => {
    const endpoint = `settlement/details/:${batchId}`;
    const response = this.#sendGetRequest(endpoint);
    return response;
  };

  /**
   * Initiate a refund on your integration.
   * @param {string} reference - Transaction reference.
   *  @param {string} customer_note [OPTIONAL] - Customer reason.
   *  @param {string} merchant_note [OPTIONAL] - Merchant reason.
   * @returns {Promise<any>} - A Promise that resolves to the response from the API.
   */
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

  /**
   * List refunds available on your integration.
   * @returns {Promise<any>} - A Promise that resolves to the response from the API.
   */
  listRefunds = async () => {
    const endpoint = "refund";
    const response = this.#sendGetRequest(endpoint);
    return response;
  };

  /**
   * Get details of a refund on your integration.
   * @param {string} reference - Identifier for transaction to be refunded (refund_reference).
   * @returns {Promise<any>} - A Promise that resolves to the response from the API.
   */
  fetchRefund = async (reference: string) => {
    const endpoint = `refund/status/:${reference}`;
    const response = this.#sendGetRequest(endpoint);
    return response;
  };
}

export default PaymentFeatures;
