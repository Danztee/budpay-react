import apiGetRequest from "../../src/utils/apiGetRequest";

describe("apiGetRequest", () => {
  it("should make a GET request with the correct endpoint and secret key", async () => {
    const endpoint = "example-endpoint";
    const secretKey = "example-secret-key";

    const mockResponse = { data: "example-data" };
    const mockFetch = jest.fn().mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockResponse),
    });
    global.fetch = mockFetch;

    const data = await apiGetRequest(endpoint, secretKey);

    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch).toHaveBeenCalledWith(
      `https://api.budpay.com/api/v2/${endpoint}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${secretKey}`,
        },
      }
    );
    expect(data).toEqual(mockResponse);
  });

  it("should return an error message when an error occurs", async () => {
    const endpoint = "example-endpoint";
    const secretKey = "example-secret-key";
    const mockError = new Error("example-error");
    const mockFetch = jest.fn().mockRejectedValueOnce(mockError);
    global.fetch = mockFetch;

    const errorMessage = await apiGetRequest(endpoint, secretKey);

    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch).toHaveBeenCalledWith(
      `https://api.budpay.com/api/v2/${endpoint}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${secretKey}`,
        },
      }
    );
    expect(errorMessage).toEqual(`${endpoint} Error: ${mockError}`);
  });
});
