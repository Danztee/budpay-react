import apiSendRequest from "../../src/utils/apiSendRequest";

describe("apiSendRequest", () => {
  const config = {
    secret_key: "your-secret-key",
    signature: "your-HMAC-Signature",
  };

  const { secret_key, signature } = config;

  it("should make a POST request with the correct endpoint, data, secret key, and url link", async () => {
    const endpoint = "example-endpoint";
    const data = { key: "value" };

    const urlLink = "https://example.com/";

    const mockResponse = { data: "example-data" };
    const mockFetch = jest.fn().mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockResponse),
    });
    global.fetch = mockFetch;

    const responseData = await apiSendRequest(
      endpoint,
      data,
      secret_key,
      signature,
      urlLink
    );

    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch).toHaveBeenCalledWith(`${urlLink}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${secret_key}`,
      },
      body: JSON.stringify(data),
    });
    expect(responseData).toEqual(mockResponse);
  });

  it("should make a POST request with the correct endpoint, data, and secret key when url link is not provided", async () => {
    const endpoint = "example-endpoint";
    const data = { key: "value" };

    const mockResponse = { data: "example-data" };
    const mockFetch = jest.fn().mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockResponse),
    });
    global.fetch = mockFetch;

    const responseData = await apiSendRequest(
      endpoint,
      data,
      secret_key,
      signature
    );

    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch).toHaveBeenCalledWith(
      `https://api.budpay.com/api/v2/${endpoint}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${secret_key}`,
        },
        body: JSON.stringify(data),
      }
    );
    expect(responseData).toEqual(mockResponse);
  });

  it("should include the Encryption header for endpoints requiring encryption", async () => {
    const endpoint = "transaction/initialize";
    const data = { key: "value" };

    const mockResponse = { data: "example-data" };
    const mockFetch = jest.fn().mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockResponse),
    });
    global.fetch = mockFetch;

    const responseData = await apiSendRequest(
      endpoint,
      data,
      secret_key,
      signature
    );

    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch).toHaveBeenCalledWith(
      `https://api.budpay.com/api/v2/${endpoint}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${secret_key}`,
          Encryption: signature,
        },
        body: JSON.stringify(data),
      }
    );
    expect(responseData).toEqual(mockResponse);
  });

  it("should throw an error when an error occurs", async () => {
    const endpoint = "example-endpoint";
    const data = { key: "value" };
    const mockError = new Error("example-error");
    const mockFetch = jest.fn().mockRejectedValueOnce(mockError);
    global.fetch = mockFetch;

    await expect(
      apiSendRequest(endpoint, data, secret_key, signature)
    ).rejects.toThrowError(
      `Error occurred while making a request to ${endpoint}`
    );

    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch).toHaveBeenCalledWith(
      `https://api.budpay.com/api/v2/${endpoint}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${secret_key}`,
        },
        body: JSON.stringify(data),
      }
    );
  });
});
