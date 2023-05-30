import { Config } from "../types";
import apiGetRequest from "../utils/apiGetRequest";
import apiSendRequest from "../utils/apiSendRequest";

class Payouts {
  #secret_key: string;
  #signature: string;

  constructor(config: Config) {
    this.#secret_key = config.secret_key;
    this.#signature = config.signature;
  }

  #sendRequest = async (endpoint: string, data: object | string) => {
    if (!this.#signature) return "please pass in your HMAC Signature";
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
   * Get a list of all supported banks and their codes.
   * @param {string} currency - Default value is NGN when not set.
   * @returns {Promise<any>} - A Promise that resolves to the response from the API.
   */
  bankLists = async (currency?: string) => {
    const endpoint = currency ? `bank_list/${currency}` : "bank_list";
    const response = this.#sendGetRequest(endpoint);
    return response;
  };

  /**
   * Initiate Transfer - Status of transfer object returned will be pending until it's processed successfully.
   * @param {string} currency - Specify the currency of the transfer. Defaults to NGN
   * @param {string} amount - Amount to transfer in currency SET value
   * @param {string} bank_code - receiver's account bank code (check bank list).
   * @param {string} bank_name - receiver's account bank name (check bank list).
   * @param {string} account_number - receiver's account number.
   * @param {string} narration - Transfer narration.
   * @param {string} paymentMode - payment mode is required only currency is KES.
   * @param {string} reference [OPTIONAL] - If specified, the field should be a unique identifier (in lowercase) for the object. Only -,_ and alphanumeric characters allowed.
   * @returns {Promise<any>} - A Promise that resolves to the response from the API.
   */
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

  /**
   * Initiate Bulk Transfer - Status of transfer object returned will be pending until it's processed successfully.
   * @param {string} currency - Specify the currency of the transfer. Defaults to NGN
   * @param {string} amount - Amount to transfer in currency SET value
   * @param {string} bank_code - receiver's account bank code (check bank list).
   * @param {string} bank_name - receiver's account bank name (check bank list).
   * @param {string} account_number - receiver's account number.
   * @param {string} narration - Transfer narration.
   * @param {string} reference [OPTIONAL] - If specified, the field should be a unique identifier (in lowercase) for the object. Only -,_ and alphanumeric characters allowed.
   * @returns {Promise<any>} - A Promise that resolves to the response from the API.
   */
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
    const endpoint = "bulk_bank_transfer";
    const response = this.#sendRequest(endpoint, data);
    return response;
  };

  /**
   * Verify Payout - Fetch a payout record using payout reference.
   * @param {string} reference - The payout reference.
   * @returns {Promise<any>} - A Promise that resolves to the response from the API.
   */
  verifyPayout = async (reference: string) => {
    const endpoint = `payout/:${reference}`;
    const response = this.#sendGetRequest(endpoint);
    return response;
  };

  /**
   * Payout Fee (Bank Transfer Fee) - Sometimes you may like to now your transfer fee before a transfer is initiated.
   * @param {string} currency - Specify the currency of the transfer. Defaults to NGN.
   * @param {string} amount - Amount to transfer in currency SET value.
   * @returns {Promise<any>} - A Promise that resolves to the response from the API.
   */
  payoutFee = async (currency: string, amount: string) => {
    const data = { currency, amount };
    const endpoint = "payout_fee";
    const response = this.#sendRequest(endpoint, data);
    return response;
  };

  /**
   * Get Wallet balance by Currency - Sometimes you may like to now your wallet balance before a transfer is initiated or for any other purpose.
   * @param {string} currency - Specify the currency of the transfer. e.g. NGN.
   * @returns {Promise<any>} - A Promise that resolves to the response from the API.
   */
  walletBalance = async (currency: string) => {
    const endpoint = `wallet_balance/${currency}`;
    const response = this.#sendGetRequest(endpoint);
    return response;
  };

  /**
   * List all your business Wallet Transactions. - The Wallet transactions API allows you fetch all your wallet transaction history.
   * @param {string} currency - Specify the currency of the transfer. e.g. NGN.
   * @returns {Promise<any>} - A Promise that resolves to the response from the API.
   */
  walletTransactions = async (currency: string) => {
    const endpoint = `wallet_transactions/${currency}`;
    const response = this.#sendGetRequest(endpoint);
    return response;
  };
}

export default Payouts;
