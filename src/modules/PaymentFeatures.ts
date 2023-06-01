import {
  Config,
  CreateCustomer,
  CreateDedicatedVirtualAccount,
  CreatePaymentLink,
  CreateRefund,
  RequestPayment,
} from "../types";
import apiGetRequest from "../utils/apiGetRequest";
import apiSendRequest from "../utils/apiSendRequest";

class PaymentFeatures {
  #secret_key: string;
  #signature: string;

  constructor(config: Config) {
    this.#secret_key = config.secret_key;
    this.#signature = config.signature;
  }

  #sendRequest = async (endpoint: string, data: object | string) => {
    return await apiSendRequest(
      endpoint,
      data,
      this.#secret_key,
      this.#signature
    );
  };

  #sendGetRequest = async (endpoint: string) => {
    return await apiGetRequest(endpoint, this.#secret_key);
  };

  /**
   * The Payment request API allows you create a payment and send payment link directly to customer email or phone directly on your integration.
   * @deprecated - not working yet
   * @param {string} payload.recipient - payment recipients. to be separated by "," phone number and emails mixture allowed.
   * @param {string} payload.amount - Payment Amount.
   * @param {string} payload.currency - payment currency.
   * @param {string} payload.description - payment description.
   * @returns {Promise<any>} - A Promise that resolves to the response from the API.
   * @deprecated This feature is not working yet.
   */
  requestPayment = async (payload: RequestPayment) => {
    if (
      !payload.amount ||
      !payload.currency ||
      !payload.description ||
      !payload.recipient
    )
      return "please pass in all required payloads";

    const endpoint = "request_payment";
    const response = this.#sendRequest(endpoint, payload);
    return response;
  };

  /**
   * The Payment link API allows you create a payment link directly on your integration.
   * @param {string} payload.amount - Payment Amount.
   * @param {string} payload.currency - currency.
   * @param {string} payload.name - Customer's fullname name.
   * @param {string} payload.description - The description for the payment link.
   * @param {string} payload.redirect - redirect url.
   * @returns {Promise<any>} - A Promise that resolves to the response from the API.
   */
  createPaymentLink = async (payload: CreatePaymentLink) => {
    if (
      !payload.amount ||
      !payload.currency ||
      !payload.description ||
      !payload.name ||
      !payload.redirect
    )
      return "please pass in all required payloads";
    const endpoint = "create_payment_link";
    const response = this.#sendRequest(endpoint, payload);
    return response;
  };

  /**
   * The Customers API allows you create and manage customers on your integration.
   * @param {string} payload.email - Customer's email address.
   * @param {string} payload.first_name - Customer's first name.
   * @param {string} payload.last_name - Customer's last name.
   * @param {string} payload.phone [OPTIONAL] - Customer's phone number.
   * @param {string} payload.metadata [OPTIONAL] - A set of key/value pairs that you can attach to the customer. It can be used to store additional information in a structured format.
   * @returns {Promise<any>} - A Promise that resolves to the response from the API.
   */
  createCustomer = async (payload: CreateCustomer) => {
    if (!payload.email || !payload.first_name || !payload.last_name)
      return "please fill in the required fields";

    const endpoint = "customer";
    const response = this.#sendRequest(endpoint, payload);
    return response;
  };

  /**
   * Create a dedicated virtual account and assign to a customer.
   * @param {string} payload.customer - Customer code.
   * @param {string} payload.first_name [OPTIONAL] - Customer's first name.
   * @param {string} payload.last_name [OPTIONAL] - Customer's last name.
   * @param {string} payload.phone [OPTIONAL] - Customer's phone number.
   * @returns {Promise<any>} - A Promise that resolves to the response from the API.
   */
  createDedicatedVirtualAccount = async (
    payload: CreateDedicatedVirtualAccount
  ) => {
    if (!payload.customer) return "please fill in the required fields";

    const endpoint = "dedicated_virtual_account";
    const response = this.#sendRequest(endpoint, payload);
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
    if (!id) return "please pass in the required fields";

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
    if (!batchId) return "please fill in the required fields";

    const endpoint = `settlement/details/:${batchId}`;
    const response = this.#sendGetRequest(endpoint);
    return response;
  };

  /**
   * Initiate a refund on your integration.
   * @param {string} payload.reference - Transaction reference.
   *  @param {string} payload.customer_note [OPTIONAL] - Customer reason.
   *  @param {string} payload.merchant_note [OPTIONAL] - Merchant reason.
   * @returns {Promise<any>} - A Promise that resolves to the response from the API.
   */
  createRefund = async (payload: CreateRefund) => {
    if (!payload.reference) return "please fill in the required fields";

    const endpoint = "refund";
    const response = this.#sendRequest(endpoint, payload);
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
    if (!reference) return "please pass in the required fields";
    const endpoint = `refund/status/:${reference}`;
    const response = this.#sendGetRequest(endpoint);
    return response;
  };
}

export default PaymentFeatures;
