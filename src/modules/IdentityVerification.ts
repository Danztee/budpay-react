import apiSendRequest from "../utils/apiSendRequest";

class IdentityVerification {
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

  // *not working
  accountNameVerify = async (bank_code: string, account_number: string) => {
    const data = { bank_code, account_number };
    const endpoint = "account_name_verify";
    const response = this.#sendRequest(endpoint, data);
    return response;
  };

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
