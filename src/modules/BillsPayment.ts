import apiGetRequest from "../utils/apiGetRequest";
import apiSendRequest from "../utils/apiSendRequest";

class BillsPayment {
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

  airtimeProviders = async () => {
    const endpoint = "airtime";
    const response = this.#sendGetRequest(endpoint);
    return response;
  };

  airtimeTopUp = async (
    provider: string,
    number: string,
    amount: string,
    reference: string
  ) => {
    const data = { provider, number, amount, reference };
    const endpoint = "airtime/topup";
    const response = this.#sendRequest(endpoint, data);
    return response;
  };

  internetProviders = async () => {
    const endpoint = "internet";
    const response = this.#sendGetRequest(endpoint);
    return response;
  };

  internetDataPlans = async (provider: string) => {
    const endpoint = `internet/plans/${provider}`;
    const response = this.#sendGetRequest(endpoint);
    return response;
  };

  internetDataPurchase = async (
    provider: string,
    number: string,
    plan_id: string,
    reference: string
  ) => {
    const data = { provider, number, plan_id, reference };
    const endpoint = "internet/data";
    const response = this.#sendRequest(endpoint, data);
    return response;
  };

  tvProviders = async () => {
    const endpoint = "tv";
    const response = this.#sendGetRequest(endpoint);
    return response;
  };

  tvProviderPackages = async (provider: string) => {
    const endpoint = `tv/packages/${provider}`;
    const response = this.#sendGetRequest(endpoint);
    return response;
  };

  tvValidate = async (provider: string, number: string) => {
    const data = { provider, number };
    const endpoint = "tv/validate";
    const response = this.#sendRequest(endpoint, data);
    return response;
  };

  tvSubscription = async (
    provider: string,
    number: string,
    plan_id: string,
    reference: string
  ) => {
    const data = { provider, number, code: plan_id, reference };
    const endpoint = "tv/pay";
    const response = this.#sendRequest(endpoint, data);
    return response;
  };

  electricityProviders = async () => {
    const endpoint = "electricity";
    const response = this.#sendGetRequest(endpoint);
    return response;
  };

  electricityValidate = async (
    provider: string,
    type: string,
    number: string
  ) => {
    const data = { provider, type, number };
    const endpoint = "electricity/validate";
    const response = this.#sendRequest(endpoint, data);
    return response;
  };

  electricityRecharge = async (
    provider: string,
    number: string,
    type: string,
    amount: string,
    reference: string
  ) => {
    const data = { provider, type, number, amount, reference };
    const endpoint = "electricity/recharge";
    const response = this.#sendRequest(endpoint, data);
    return response;
  };
}

export default BillsPayment;
