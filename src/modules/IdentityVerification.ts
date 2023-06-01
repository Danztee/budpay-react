import { AccountNameVerify, Config, verifyBVN } from "../types";
import apiSendRequest from "../utils/apiSendRequest";

class IdentityVerification {
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

  /**
   * Get the account name on an account number.
   * @deprecated not working yet
   * @param {string} payload.bank_code - account bank code
   * @param {string} payload.account_number - account number
   * @returns {Promise<any>} - A Promise that resolves to the response from the API.
   */
  accountNameVerify = async (payload: AccountNameVerify) => {
    const endpoint = "account_name_verify";
    const response = this.#sendRequest(endpoint, payload);
    return response;
  };

  /**
   * Get the bvn details match on any bvn number.
   * @param {string} payload.bvn - bvn to verify (use 00000000000 in test mode)
   * @param {string} payload.callback_url - your callback url to get verification response
   * @param {string} payload.first_name [OPTIONAL] - bvn firstname
   * @param {string} payload.middle_name [OPTIONAL] - bvn middlename
   * @param {string} payload.last_name [OPTIONAL] - bvn lastname
   * @param {string} payload.phone_number [OPTIONAL] - bvn phone number
   * @param {string} payload.dob [OPTIONAL] -  bvn date of birth (YYYY-MM-DD)
   * @param {string} payload.gender [OPTIONAL] - bvn user gender
   * @param {string} payload.reference [OPTIONAL] - your unique reference number (we will generate one automatically if not provided)
   * @returns {Promise<any>} - A Promise that resolves to the response from the API.
   */
  verifyBVN = async (payload: verifyBVN) => {
    const endpoint = "bvn/verify";
    const response = this.#sendRequest(endpoint, payload);
    return response;
  };
}

export default IdentityVerification;
