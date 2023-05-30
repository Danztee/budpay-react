import { Config } from "../types";
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
   * @param {string} bank_code - account bank code
   * @param {string} account_number - account number
   * @returns {Promise<any>} - A Promise that resolves to the response from the API.
   */
  accountNameVerify = async (bank_code: string, account_number: string) => {
    const data = { bank_code, account_number };
    const endpoint = "account_name_verify";
    const response = this.#sendRequest(endpoint, data);
    return response;
  };

  /**
   * Get the account name on an account number.
   * @deprecated - not working yet
   * @param {string} bvn - bvn to verify (use 00000000000 in test mode)
   * @param {string} callback_url - your callback url to get verification response
   * @param {string} first_name [OPTIONAL] - bvn firstname
   * @param {string} middle_name [OPTIONAL] - bvn middlename
   * @param {string} last_name [OPTIONAL] - bvn lastname
   * @param {string} phone_number [OPTIONAL] - bvn phone number
   * @param {string} dob [OPTIONAL] -  bvn date of birth (YYYY-MM-DD)
   * @param {string} gender [OPTIONAL] - bvn user gender
   * @param {string} reference [OPTIONAL] - your unique reference number (we will generate one automatically if not provided)
   * @returns {Promise<any>} - A Promise that resolves to the response from the API.
   */
  verifyBVN = async (
    bvn: string,
    callback_url: string,
    first_name?: string,
    middle_name?: string,
    last_name?: string,
    phone_number?: string,
    dob?: string,
    gender?: string,
    reference?: string
  ) => {
    const data = {
      bvn,
      callback_url,
      first_name,
      middle_name,
      last_name,
      phone_number,
      dob,
      gender,
      reference,
    };
    const endpoint = "bvn/verify";
    const response = this.#sendRequest(endpoint, data);
    return response;
  };
}

export default IdentityVerification;
