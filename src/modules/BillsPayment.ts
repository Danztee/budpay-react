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

  /**
   * Airtime Providers - Getting all available Airtime Providers.
   * @returns {Promise<any>} - A Promise that resolves to the response from the API.
   */
  airtimeProviders = async () => {
    const endpoint = "airtime";
    const response = this.#sendGetRequest(endpoint);
    return response;
  };

  /**
   * Airtime TopUp - To Initiate an Airtime TopUp Transaction.
   * @param {string} provider - use the provider returned in airtime-providers.
   * @param {string} number - Customer's/beneficiary's phone number to recharge/topup.
   * @param {string} amount - Amount to Topup.
   * @param {string} reference - 	If specified, the field should be a unique identifier (in lowercase) for the object. Only -,_ and alphanumeric characters allowed.
   * @returns {Promise<any>} - A Promise that resolves to the response from the API.
   */
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

  /**
   * Internet Providers - Getting all available Internet Providers.
   * @returns {Promise<any>} - A Promise that resolves to the response from the API.
   */
  internetProviders = async () => {
    const endpoint = "internet";
    const response = this.#sendGetRequest(endpoint);
    return response;
  };

  /**
   * Internet Data Plans - Getting all available Internet Data Plans.
   * @param {string} provider - use the provider returned in internet-providers.
   * @returns {Promise<any>} - A Promise that resolves to the response from the API.
   */
  internetDataPlans = async (provider: string) => {
    const endpoint = `internet/plans/${provider}`;
    const response = this.#sendGetRequest(endpoint);
    return response;
  };

  /**
   * Internet Data Purchase - To Initiate a Internet Data Purchase Transaction.
   * @param {string} provider - use the provider returned in airtime-providers.
   * @param {string} number - Customer's/beneficiary's phone number to recharge/topup.
   * @param {string} plan_id - id of the data plan you are subscribing to.
   * @param {string} reference - If specified, the field should be a unique identifier (in lowercase) for the object. Only -,_ and alphanumeric characters allowed.
   * @returns {Promise<any>} - A Promise that resolves to the response from the API.
   */
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

  /**
   * TV Providers - Getting all available Tv Providers.
   * @returns {Promise<any>} - A Promise that resolves to the response from the API.
   */
  tvProviders = async () => {
    const endpoint = "tv";
    const response = this.#sendGetRequest(endpoint);
    return response;
  };

  /**
   * Tv Packages (Bouquet) - Getting all available Tv Packages (Bouquet) of a Provider.
   * @param {string} provider - use the provider returned in tv-providers.
   * @returns {Promise<any>} - A Promise that resolves to the response from the API.
   */
  tvProviderPackages = async (provider: string) => {
    const endpoint = `tv/packages/${provider}`;
    const response = this.#sendGetRequest(endpoint);
    return response;
  };

  /**
   * Tv validate - To perform a Tv UIC Number Validation.
   * @param {string} provider - use the provider returned in tv-providers.
   * @param {string} number - Customer's/beneficiary's smartcard/IUC number to subscribe on.
   * @returns {Promise<any>} - A Promise that resolves to the response from the API.
   */
  tvValidate = async (provider: string, number: string) => {
    const data = { provider, number };
    const endpoint = "tv/validate";
    const response = this.#sendRequest(endpoint, data);
    return response;
  };

  /**
   * Tv Subscription - To Initiate a Tv Subscription Payment.
   * @param {string} provider - use the provider returned in tv-providers.
   * @param {string} number - Customer's/beneficiary's smartcard/IUC number to subscribe on.
   * @param {string} plan_id - id of the TV Package (Bouquet) you are subscribing to.
   * @param {string} reference - If specified, the field should be a unique identifier (in lowercase) for the object. Only -,_ and alphanumeric characters allowed.
   * @returns {Promise<any>} - A Promise that resolves to the response from the API.
   */
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

  /**
   * Electricity Providers - Getting all available Electricity Providers.
   * @returns {Promise<any>} - A Promise that resolves to the response from the API.
   */
  electricityProviders = async () => {
    const endpoint = "electricity";
    const response = this.#sendGetRequest(endpoint);
    return response;
  };

  /**
   * Electricity Validate - To perform a Electricity Meter Number Validation.
   * @param {string} provider - please use the provider name of the provider as returned in Electricity providers (e.g. for IBEDC).
   * @param {string} type - meter type (Prepaid or Postpaid).
   * @param {string} number - Customer's/beneficiary's Meter number to subscribe on.
   * @returns {Promise<any>} - A Promise that resolves to the response from the API.
   */
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

  /**
   * Electricity Recharge - To Initiate a Electricity Recharge Payment.
   * @param {string} provider - please use the provider name of the provider as returned in Electricity providers (e.g. for IBEDC).
   * @param {string} number - Customer's/beneficiary's Meter number to subscribe on.
   * @param {string} type - meter type (Prepaid or Postpaid).
   * @param {string} amount - amount to recharge.
   * @param {string} reference -	If specified, the field should be a unique identifier (in lowercase) for the object. Only -,_ and alphanumeric characters allowed.
   * @returns {Promise<any>} - A Promise that resolves to the response from the API.
   */
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
