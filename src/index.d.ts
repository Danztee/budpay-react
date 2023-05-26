/**
 * Budpay class for interacting with the Budpay API.
 */
class Budpay {
  /**
   * Create a new instance of the Budpay class.
   * @param {string} secret_key - The secret key used for authentication.
   */
  constructor(secret_key) {
    this.#secret_key = secret_key;
  }

  /**
   * Send a request to the Budpay API.
   * @param {string} endpoint - The API endpoint to send the request to.
   * @param {object|string} data - The data to be sent with the request.
   * @param {string} [url_link] - The custom URL link for the request.
   * @returns {Promise<any>} - A Promise that resolves to the response from the API.
   * @private
   */
  async #sendRequest(endpoint, data, url_link) {
    return await apiSendRequest(endpoint, data, this.#secret_key, url_link);
  }

  /**
   * Send a GET request to the Budpay API.
   * @param {string} endpoint - The API endpoint to send the request to.
   * @param {string} [url_link] - The custom URL link for the request.
   * @returns {Promise<any>} - A Promise that resolves to the response from the API.
   * @private
   */
  async #sendGetRequest(endpoint, url_link) {
    return await apiGetRequest(endpoint, this.#secret_key, url_link);
  }

  /**
   * The Transactions API allows you create and manage payments on your integration.
   * @param {string} email - Customer email address.
   * @param {string} amount - Amount you are debiting customer. Do not pass this if creating subscriptions.
   * @param {string} currency [optional] - Currency charge should be performed in. Allowed values are: NGN, USD or GBP It defaults to your integration currency. Default currency set to NGN when currency parameter is not set.
   * @param {string} reference [optional] - Unique case sensitive transaction reference. Only -,_,., =and alphanumeric characters allowed. If you do not pass this parameter, Budpay will generate a unique reference for you.
   * @param {string} callback [optional] - Function that runs when payment is successful. This should ideally be a script that uses the verify endpoint on the Budpay API to check the status of the transaction.
   * @returns {Promise<any>} - A Promise that resolves to the response from the API.
   */
  async standardCheckout(
    email: string,
    amount: string,
    currency?: string,
    reference?: string,
    callback?: string
  ): Promise;

  /**
   * Encrypt card details for secure transmission.
   * @param {object} card_details - The card details to be encrypted.
   * @returns {Promise<any>} - A Promise that resolves to the response from the API.
   */
  async cardEncryption(card_details) {
    const endpoint = "test/encryption";
    const response = this.#sendRequest(endpoint, card_details);
    return response;
  }

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
  async serverToServer(
    amount: string,
    encryptedCard: string,
    callback: string,
    currency: string,
    email: string,
    reference: string,
    pin?: string
  ): Promise;

  /**
   * The Bank Transfer API allows you create a checkout or one time bank account to accept payment via bank transfer.
   * @param {string} email - Set value to customer email.
   * @param {string} amount - Set value to checkout amount.
   * @param {string} currency - Set value to checkout currency (only NGN allowed).
   * @param {string} reference - Set value to your unique reference number.
   * @param {string} name - Set value to prefered name on the account.
   * @returns {Promise<any>} - A Promise that resolves to the response from the API.
   */
  async serverToServerBankTransferCheckout(
    email: string,
    amount: string,
    currency: string,
    reference: string,
    name: string
  ): Promise;

  /**
   * The Transactions API allows you create and manage payments on your integration.
   * @param {string} amount - Amount you are debiting customer. Do not pass this if creating subscriptions..
   * @param {string} encryptedCard - Encrypted Card output from card encryption.
   * @param {string} email - Customer email address.
   * @param {string} reference - Unique case sensitive transaction reference. Only -,_,., =and alphanumeric characters allowed.
   *  * @param {string} currency [OPTIONAL] - Currency charge should be performed in. Allowed values are: NGN, USD or GBP It defaults to your integration currency. Default currency set to NGN when currency parameter is not set.
   * @returns {Promise<any>} - A Promise that resolves to the response from the API.
   */
  async serverToServerV2(
    amount: string,
    encryptedCard: string,
    email: string,
    reference: string,
    currency?: string
  ): Promise<>;

  /**
   * Verify Transaction with Reference number.
   * @param {string} reference - The transaction reference used to initiate the transaction.
   * @returns {Promise<any>} - A Promise that resolves to the response from the API.
   */
  async verifyTransaction(customer: string): Promise;

  /**
   * Fetch Single Transaction by id.
   * @param {string} id - An ID for the transaction to fetch.
   * @returns {Promise<any>} - A Promise that resolves to the response from the API.
   */
  async fetchTransaction(id: string): Promise;

  /**
   * Fetch Single Transaction by query.
   * @param {string} search - reference / sessionid / account number/ card pan.
   * @returns {Promise<any>} - A Promise that resolves to the response from the API.
   */
  async queryTransaction(search: string): Promise;

  /**
   * Fetch all transactions.
   * @returns {Promise<any>} - A Promise that resolves to the response from the API.
   */
  async fetchAllTransactions(): Promise;

  // PAYMENT FEATURES
  //

  /**
   * The Payment request API allows you create a payment and send payment link directly to customer email or phone directly on your integration.
   * @param {string} recipient - payment recipients. to be separated by "," phone number and emails mixture allowed.
   * @param {string} amount - Payment Amount.
   * @param {string} currency - payment currency.
   * @param {string} description - payment description.
   * @returns {Promise<any>} - A Promise that resolves to the response from the API.
   * @deprecated This feature is not working yet.
   */
  async requestPayment(
    recipient: string,
    amount: string,
    currency: string,
    description: string
  ): Promise;

  /**
   * The Payment link API allows you create a payment link directly on your integration.
   * @param {string} amount - Payment Amount.
   * @param {string} currency - currency.
   * @param {string} name - Customer's fullname name.
   * @param {string} description - The description for the payment link.
   * @param {string} redirect - redirect url.
   * @returns {Promise<any>} - A Promise that resolves to the response from the API.
   */
  async createPaymentLink(
    amount: string,
    currency: string,
    name: string,
    description: string,
    redirect: string
  ): Promise;

  /**
   * The Customers API allows you create and manage customers on your integration.
   * @param {string} email - Customer's email address.
   * @param {string} first_name - Customer's first name.
   * @param {string} last_name - Customer's last name.
   * @param {string} phone [OPTIONAL] - Customer's phone number.
   * @param {string} metadata [OPTIONAL] - A set of key/value pairs that you can attach to the customer. It can be used to store additional information in a structured format.
   * @returns {Promise<any>} - A Promise that resolves to the response from the API.
   */
  async createCustomer(
    email: string,
    first_name: string,
    last_name: string,
    phone?: string,
    metadata?: string
  ): Promise;

  /**
   * Create a dedicated virtual account and assign to a customer.
   * @param {string} customer - Customer code.
   * @param {string} first_name [OPTIONAL] - Customer's first name.
   * @param {string} last_name [OPTIONAL] - Customer's last name.
   * @param {string} phone [OPTIONAL] - Customer's phone number.
   * @returns {Promise<any>} - A Promise that resolves to the response from the API.
   */
  async createDedicatedVirtualAccount(
    customer: string,
    first_name?: string,
    last_name?: string,
    phone?: string
  ): Promise;

  /**
   * List dedicated virtual accounts available on your integration..
   * @returns {Promise<any>} - A Promise that resolves to the response from the API.
   */
  async listDedicatedVirtualAccount(): Promise;

  /**
   * Get details of a dedicated virtual account on your integration.
   * @param {string} id - The ID of the dedicated virtual account.
   * @returns {Promise<any>} - A Promise that resolves to the response from the API.
   */
  async fetchDedicatedVirtualAccountById(id: string): Promise;

  /**
   * List all your business Settlements.
   * @returns {Promise<any>} - A Promise that resolves to the response from the API.
   */
  async getSettlements(): Promise;

  /**
   * Get details of a Settlement with all transactions of that settlement.
   * @param {string} batchId - settlement batchid.
   * @returns {Promise<any>} - A Promise that resolves to the response from the API.
   */
  async getSettlementsByBatch(batchId: string): Promise;

  /**
   * Initiate a refund on your integration.
   * @param {string} reference - Transaction reference.
   *  @param {string} customer_note [OPTIONAL] - Customer reason.
   *  @param {string} merchant_note [OPTIONAL] - Merchant reason.
   * @returns {Promise<any>} - A Promise that resolves to the response from the API.
   */
  async createRefund(
    reference: string,
    customer_note?: string,
    merchant_note?: string
  ): Promise;

  /**
   * List refunds available on your integration.
   * @returns {Promise<any>} - A Promise that resolves to the response from the API.
   */
  async listRefunds(): Promise;

  /**
   * Get details of a refund on your integration.
   * @param {string} reference - Identifier for transaction to be refunded (refund_reference).
   * @returns {Promise<any>} - A Promise that resolves to the response from the API.
   * @deprecated This feature is not working yet.
   */
  async fetchRefund(reference: string): Promise;

  /*
  =============== 
  PAYOUT
  ===============
  */

  /**
   * Get a list of all supported banks and their codes.
   * @param {string} currency - Default value is NGN when not set.
   * @returns {Promise<any>} - A Promise that resolves to the response from the API.
   */
  async bankLists(currency?: string): Promise;

  /**
   * Get the account name on an account number.
   * @param {string} bank_code - account bank code
   * @param {string} account_number - account number
   * @param {string} bank_code [OPTIONAL] - currency is required if not NGN. (only NGN and KES available at the moment)
   * @returns {Promise<any>} - A Promise that resolves to the response from the API.
   */
  async accountNameVerify(
    bank_code: string,
    account_number: string,
    currency?: string
  ): Promise;

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
  async singlePayout(
    currency: string,
    amount: string,
    bank_code: string,
    bank_name: string,
    account_number: string,
    narration: string,
    paymentMode?: string,
    reference?: string
  ): Promise;

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
  async bulkPayout(
    currency: string,
    transfers: {
      amount: string;
      bank_code: string;
      bank_name: string;
      account_number: string;
      narration: string;
      reference?: string;
    }[]
  ): Promise;

  /**
   * Verify Payout - Fetch a payout record using payout reference.
   * @param {string} reference - The payout reference.
   * @returns {Promise<any>} - A Promise that resolves to the response from the API.
   */
  async verifyPayout(reference: string): Promise;

  /**
   * Payout Fee (Bank Transfer Fee) - Sometimes you may like to now your transfer fee before a transfer is initiated.
   * @param {string} currency - Specify the currency of the transfer. Defaults to NGN.
   * @param {string} amount - Amount to transfer in currency SET value.
   * @returns {Promise<any>} - A Promise that resolves to the response from the API.
   */
  async payoutFee(currency: string, amount: string): Promise;

  /**
   * Get Wallet balance by Currency - Sometimes you may like to now your wallet balance before a transfer is initiated or for any other purpose.
   * @param {string} currency - Specify the currency of the transfer. e.g. NGN.
   * @returns {Promise<any>} - A Promise that resolves to the response from the API.
   */
  async walletBalance(currency: string): Promise;

  /**
   * List all your business Wallet Transactions. - The Wallet transactions API allows you fetch all your wallet transaction history.
   * @param {string} currency - Specify the currency of the transfer. e.g. NGN.
   * @returns {Promise<any>} - A Promise that resolves to the response from the API.
   */
  async walletTransactions(currency: string): Promise;

  /*
  =============== 
  BILLS PAYMENT
  ===============
  */

  /**
   * Airtime Providers - Getting all available Airtime Providers.
   * @returns {Promise<any>} - A Promise that resolves to the response from the API.
   */
  async airtimeProviders(): Promise;

  /**
   * Airtime TopUp - To Initiate an Airtime TopUp Transaction.
   * @param {string} provider - use the provider returned in airtime-providers.
   * @param {string} number - Customer's/beneficiary's phone number to recharge/topup.
   * @param {string} amount - Amount to Topup.
   * @param {string} reference - 	If specified, the field should be a unique identifier (in lowercase) for the object. Only -,_ and alphanumeric characters allowed.
   * @returns {Promise<any>} - A Promise that resolves to the response from the API.
   */
  async airtimeTopUp(
    provider: string,
    number: string,
    amount: string,
    reference: string
  ): Promise;

  /**
   * Internet Providers - Getting all available Internet Providers.
   * @returns {Promise<any>} - A Promise that resolves to the response from the API.
   */
  async internetProviders(): Promise;

  /**
   * Internet Data Plans - Getting all available Internet Data Plans.
   * @param {string} provider - use the provider returned in internet-providers.
   * @returns {Promise<any>} - A Promise that resolves to the response from the API.
   */
  async internetDataPlans(provider: string): Promise;

  /**
   * Internet Data Purchase - To Initiate a Internet Data Purchase Transaction.
   * @param {string} provider - use the provider returned in airtime-providers.
   * @param {string} number - Customer's/beneficiary's phone number to recharge/topup.
   * @param {string} plan_id - id of the data plan you are subscribing to.
   * @param {string} reference - If specified, the field should be a unique identifier (in lowercase) for the object. Only -,_ and alphanumeric characters allowed.
   * @returns {Promise<any>} - A Promise that resolves to the response from the API.
   */
  async internetDataPurchase(
    provider: string,
    number: string,
    plan_id: string,
    reference: string
  ): Promise;

  /**
   * TV Providers - Getting all available Tv Providers.
   * @returns {Promise<any>} - A Promise that resolves to the response from the API.
   */
  async tvProviders(): Promise;

  /**
   * Tv Packages (Bouquet) - Getting all available Tv Packages (Bouquet) of a Provider.
   * @param {string} provider - use the provider returned in tv-providers.
   * @returns {Promise<any>} - A Promise that resolves to the response from the API.
   */
  async tvProviderPackages(provider: string): Promise;

  /**
   * Tv validate - To perform a Tv UIC Number Validation.
   * @param {string} provider - use the provider returned in tv-providers.
   * @param {string} number - Customer's/beneficiary's smartcard/IUC number to subscribe on.
   * @returns {Promise<any>} - A Promise that resolves to the response from the API.
   */
  async tvValidate(provider: string, number: string): Promise;

  /**
   * Tv Subscription - To Initiate a Tv Subscription Payment.
   * @param {string} provider - use the provider returned in tv-providers.
   * @param {string} number - Customer's/beneficiary's smartcard/IUC number to subscribe on.
   * @param {string} plan_id - id of the TV Package (Bouquet) you are subscribing to.
   * @param {string} reference - If specified, the field should be a unique identifier (in lowercase) for the object. Only -,_ and alphanumeric characters allowed.
   * @returns {Promise<any>} - A Promise that resolves to the response from the API.
   */
  async tvSubscription(
    provider: string,
    number: string,
    plan_id: string,
    reference: string
  ): Promise;
}
