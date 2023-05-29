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

  #sendGetRequest = async (endpoint: string) => {
    return await apiGetRequest(endpoint, this.#secret_key);
  };

  /**
   * The Transactions API allows you create and manage payments on your integration.
   * @param {string} email - Customer email address.
   * @param {string} amount - Amount you are debiting customer. Do not pass this if creating subscriptions.
   * @param {string} currency [optional] - Currency charge should be performed in. Allowed values are: NGN, USD or GBP It defaults to your integration currency. Default currency set to NGN when currency parameter is not set.
   * @param {string} reference [optional] - Unique case sensitive transaction reference. Only -,_,., =and alphanumeric characters allowed. If you do not pass this parameter, Budpay will generate a unique reference for you.
   * @param {string} callback [optional] - Function that runs when payment is successful. This should ideally be a script that uses the verify endpoint on the Budpay API to check the status of the transaction.
   * @returns {Promise<any>} - A Promise that resolves to the response from the API.
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
   * @param {string} amount - payment value.
   * @param {string} encryptedCard - the output from your card encryption.
   * @param {string} callback - your callback url.
   * @param {string} currency - 	your transaction currency i.e NGN.
   * @param {string} email - customer email.
   * @param {string} reference - a unique identifier.
   * @param {string} pin [optional for mastercard, required for verve and visa] - card pin.
   * @returns {Promise<any>} - A Promise that resolves to the response from the API.
   */
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

  /**
   * The Bank Transfer API allows you create a checkout or one time bank account to accept payment via bank transfer.
   * @param {string} email - Set value to customer email.
   * @param {string} amount - Set value to checkout amount.
   * @param {string} currency - Set value to checkout currency (only NGN allowed).
   * @param {string} reference - Set value to your unique reference number.
   * @param {string} name - Set value to prefered name on the account.
   * @returns {Promise<any>} - A Promise that resolves to the response from the API.
   */
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

  /**
   * The Transactions API allows you create and manage payments on your integration.
   * @param {string} amount - Amount you are debiting customer. Do not pass this if creating subscriptions..
   * @param {string} encryptedCard - Encrypted Card output from card encryption.
   * @param {string} email - Customer email address.
   * @param {string} reference - Unique case sensitive transaction reference. Only -,_,., =and alphanumeric characters allowed.
   *  * @param {string} currency [OPTIONAL] - Currency charge should be performed in. Allowed values are: NGN, USD or GBP It defaults to your integration currency. Default currency set to NGN when currency parameter is not set.
   * @returns {Promise<any>} - A Promise that resolves to the response from the API.
   */
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
