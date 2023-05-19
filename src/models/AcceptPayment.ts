class AcceptPayment {
  #secret_key: string;

  constructor(secret_key: string) {
    this.#secret_key = secret_key;
  }

  #sendRequest = async (endpoint: string, verification_data: any) => {
    return await apiRequest(
      //
      endpoint,
      verification_data,
      this.#secret_key
    );
  };

  standardCheckout = async () => {
    const payment_data = {
      email: "customer@email.com",
      amount: "20000",
      callback: "youcallbackurl",
    };

    const endpoint = "transaction/initialize";
    const response = this.#sendRequest(endpoint, payment_data);
    return response;
  };
}

export default AcceptPayment;
