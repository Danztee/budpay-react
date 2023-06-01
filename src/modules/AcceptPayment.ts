import {
  Config,
  ServerToServerBankTransferCheckout,
  StandardCheckout,
  ServerToServer,
  ServerToServerV2,
} from "../types";
import apiGetRequest from "../utils/apiGetRequest";
import apiSendRequest from "../utils/apiSendRequest";

class AcceptPayment {
  #secret_key: string;
  #signature: string;

  constructor(config: Config) {
    this.#secret_key = config.secret_key;
    this.#signature = config.signature;
  }

  #sendRequest = async (
    endpoint: string,
    data: object | string,
    url_link?: string
  ) => {
    return await apiSendRequest(
      endpoint,
      data,
      this.#secret_key,
      this.#signature,
      url_link
    );
  };

  #sendGetRequest = async (endpoint: string) => {
    return await apiGetRequest(endpoint, this.#secret_key);
  };

  /**
   * The Transactions API allows you create and manage payments on your integration.
   * @param {string} payload.email - Customer email address.
   * @param {string} payload.amount - Amount you are debiting customer. Do not pass this if creating subscriptions.
   * @param {string} payload.currency [optional] - Currency charge should be performed in. Allowed values are: NGN, USD or GBP It defaults to your integration currency. Default currency set to NGN when currency parameter is not set.
   * @param {string} payload.reference [optional] - Unique case sensitive transaction reference. Only -,_,., =and alphanumeric characters allowed. If you do not pass this parameter, Budpay will generate a unique reference for you.
   * @param {string} payload.callback [optional] - Function that runs when payment is successful. This should ideally be a script that uses the verify endpoint on the Budpay API to check the status of the transaction.
   * @returns {Promise<any>} - A Promise that resolves to the response from the API.
   */
  standardCheckout = async (payload: StandardCheckout) => {
    if (!payload.email || !payload.amount)
      return "please pass in all the required payload";
    const endpoint = "transaction/initialize";
    const response = this.#sendRequest(endpoint, payload);
    return response;
  };

  /**
   * Card Encryption: perform aes-128-cbc encryption on your card payload using your pub_key and reference.
   * @deprecated - This method is not working yet.
   * @param {Object} data - The card details.
   * @param {string} number - Card number.
   * @param {string} expiryMonth - Card expiry month.
   * @param {string} expiryYear - Card expiry year.
   * @param {string} cvv - Card CVV.
   * @param {string} pin OPTIONAL - Card PIN (optional, required for verve/local cards).
   * @param {string} reference - Unique identifier for the object. Only -,_ and alphanumeric characters allowed.
   * @returns {Promise<any>} - A Promise that resolves to the response from the API.
   */
  cardEncryption = async (
    data: {
      number: string;
      expiryMonth: string;
      expiryYear: string;
      cvv: string;
      pin?: string;
    },
    reference: string
  ) => {
    const card_details = { data, reference };
    console.log(card_details);
    const endpoint = "test/encryption";
    const response = this.#sendRequest(endpoint, card_details);
    return response;
  };

  /**
   * Perform a server-to-server transaction.
   * @param {string} payload.amount - payment value.
   * @param {string} payload.card - the output from your card encryption.
   * @param {string} payload.callback - your callback url.
   * @param {string} payload.currency - 	your transaction currency i.e NGN.
   * @param {string} payload.email - customer email.
   * @param {string} payload.reference - a unique identifier.
   * @param {string} payload.pin [optional for mastercard, required for verve and visa] - card pin.
   * @returns {Promise<any>} - A Promise that resolves to the response from the API.
   */
  serverToServer = async (payload: ServerToServer) => {
    if (
      !payload.email ||
      !payload.amount ||
      !payload.callback ||
      !payload.card ||
      !payload.reference ||
      !payload.currency
    )
      return "please pass in all the required payload";
    const url_link = "https://api.budpay.com/api/s2s/";
    const endpoint = "transaction/initialize";
    const response = this.#sendRequest(endpoint, payload, url_link);
    return response;
  };

  /**
   * The Bank Transfer API allows you create a checkout or one time bank account to accept payment via bank transfer.
   * @param {string} payload.email - Set value to customer email.
   * @param {string} payload.amount - Set value to checkout amount.
   * @param {string} payload.currency - Set value to checkout currency (only NGN allowed).
   * @param {string} payload.reference - Set value to your unique reference number.
   * @param {string} payload.name - Set value to prefered name on the account.
   * @returns {Promise<any>} - A Promise that resolves to the response from the API.
   */
  serverToServerBankTransferCheckout = async (
    payload: ServerToServerBankTransferCheckout
  ) => {
    if (
      !payload.email ||
      !payload.amount ||
      !payload.name ||
      !payload.reference ||
      !payload.currency
    )
      return "please pass in all the required payload";
    const url_link = "https://api.budpay.com/api/s2s/";
    const endpoint = "banktransfer/initialize";
    const response = this.#sendRequest(endpoint, payload, url_link);
    return response;
  };

  /**
   * The Transactions API allows you create and manage payments on your integration.
   * @param {string} payload.amount - Amount you are debiting customer. Do not pass this if creating subscriptions..
   * @param {string} payload.card - Encrypted Card output from card encryption.
   * @param {string} payload.email - Customer email address.
   * @param {string} payload.reference - Unique case sensitive transaction reference. Only -,_,., =and alphanumeric characters allowed.
   *  * @param {string} payload.currency [OPTIONAL] - Currency charge should be performed in. Allowed values are: NGN, USD or GBP It defaults to your integration currency. Default currency set to NGN when currency parameter is not set.
   * @returns {Promise<any>} - A Promise that resolves to the response from the API.
   */
  serverToServerV2 = async (payload: ServerToServerV2) => {
    if (
      !payload.amount ||
      !payload.email ||
      !payload.card ||
      !payload.reference
    )
      return "please pass in all the required payload";
    const url_link = "https://api.budpay.com/api/s2s/v2/";
    const endpoint = "transaction/initialize";
    const response = this.#sendRequest(endpoint, payload, url_link);
    return response;
  };

  /**
   * Verify Transaction with Reference number.
   * @param {string} reference - The transaction reference used to initiate the transaction.
   * @returns {Promise<any>} - A Promise that resolves to the response from the API.
   */
  verifyTransaction = async (reference: string) => {
    const endpoint = `transaction/verify/:${reference}`;
    const response = this.#sendGetRequest(endpoint);
    return response;
  };

  /**
   * Fetch Single Transaction by id.
   * @param {string} id - An ID for the transaction to fetch.
   * @returns {Promise<any>} - A Promise that resolves to the response from the API.
   */
  fetchTransaction = async (id: string) => {
    const endpoint = `transaction/:${id}`;
    const response = this.#sendGetRequest(endpoint);
    return response;
  };

  /**
   * Fetch Single Transaction by query.
   * @param {string} search - reference / sessionid / account number/ card pan.
   * @returns {Promise<any>} - A Promise that resolves to the response from the API.
   */
  queryTransaction = async (search: string) => {
    const endpoint = `transaction_query/${search}`;
    const response = this.#sendGetRequest(endpoint);
    return response;
  };

  /**
   * Fetch all transactions.
   * @returns {Promise<any>} - A Promise that resolves to the response from the API.
   */
  fetchAllTransactions = async () => {
    const endpoint = "transaction";
    const response = this.#sendGetRequest(endpoint);
    return response;
  };
}

export default AcceptPayment;
