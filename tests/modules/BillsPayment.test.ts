import BillsPayment from "../../src/modules/BillsPayment";
import apiGetRequest from "../../src/utils/apiGetRequest";
import apiSendRequest from "../../src/utils/apiSendRequest";

jest.mock("../src/utils/apiGetRequest");
jest.mock("../src/utils/apiSendRequest");

describe("BillsPayment", () => {
  let billsPayment: BillsPayment;
  const mockSendRequest = apiSendRequest as jest.Mock;
  const mockGetRequest = apiGetRequest as jest.Mock;

  const secret_key = "sk_test_3xd7ybrhumna6sn9kumn3eqljal6lghshb3uiu9";

  beforeEach(() => {
    billsPayment = new BillsPayment(secret_key);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("airtimeProviders", () => {
    it("should call apiGetRequest with correct endpoint", async () => {
      const expectedEndpoint = "airtime";
      mockGetRequest.mockResolvedValueOnce({ status: true });

      await billsPayment.airtimeProviders();

      expect(apiGetRequest).toHaveBeenCalledWith(expectedEndpoint, secret_key);
    });
  });

  describe("airtimeTopUp", () => {
    it("should call apiSendRequest with correct endpoint and data", async () => {
      const provider = "MTN";
      const number = "07036218209";
      const amount = "100";
      const reference = "2459392959593939";
      const expectedData = {
        provider,
        number,
        amount,
        reference,
      };
      const expectedEndpoint = "airtime/topup";
      mockSendRequest.mockResolvedValueOnce({ status: true });

      await billsPayment.airtimeTopUp(provider, number, amount, reference);

      expect(apiSendRequest).toHaveBeenCalledWith(
        expectedEndpoint,
        expectedData,
        secret_key
      );
    });
  });

  describe("internetProviders", () => {
    it("should call apiGetRequest with correct endpoint", async () => {
      const response = {
        success: true,
        // ...
      };
      mockGetRequest.mockResolvedValueOnce(response);

      const result = await billsPayment.internetProviders();

      expect(result).toHaveProperty("success", true);
      expect(apiGetRequest).toHaveBeenCalledWith("internet", secret_key);
    });
  });

  describe("internetDataPlans", () => {
    it("should call apiGetRequest with correct endpoint", async () => {
      const provider = "MTN";
      const endpoint = `internet/plans/${provider}`;

      await billsPayment.internetDataPlans(provider);
      expect(apiGetRequest).toHaveBeenCalledWith(endpoint, secret_key);
    });
  });

  describe("internetDataPurchase", () => {
    it("should call apiGetRequest with correct endpoint", async () => {
      const provider = "MTN";
      const number = "07036218209";
      const plan_id = "238";
      const reference = "2459392959593939";

      const data = { provider, number, plan_id, reference };

      const endpoint = "internet/data";

      mockSendRequest.mockResolvedValue({ success: true });
      const result = await billsPayment.internetDataPurchase(
        provider,
        number,
        plan_id,
        reference
      );
      expect(result).toHaveProperty("success", true);
      expect(apiSendRequest).toHaveBeenCalledWith(endpoint, data, secret_key);
    });
  });

  describe("tvProviders", () => {
    it("should call apiGetRequest with correct endpoint", async () => {
      const endpoint = "tv";
      await billsPayment.tvProviders();
      expect(mockGetRequest).toHaveBeenCalledWith(endpoint, secret_key);
    });
  });

  describe("tvProviderPackages", () => {
    it("should call #sendGetRequest with correct endpoint", async () => {
      const provider = "GOTV";
      const endpoint = `tv/packages/${provider}`;

      const expectedResponse = {
        success: true,
        code: "00000",
        message: "CableTv Packages Fetched successfully",
        data: [
          {
            id: 34,
            name: "GOtv Max N3,600",
            code: "gotv-max",
            amount: "3600",
          },
          {
            id: 35,
            name: "GOtv Jolli N2,460",
            code: "gotv-jolli",
            amount: "2460",
          },
          {
            id: 36,
            name: "GOtv Jinja N1,640",
            code: "gotv-jinja",
            amount: "1640",
          },
          {
            id: 37,
            name: "GOtv Smallie - monthly N800",
            code: "gotv-smallie",
            amount: "800",
          },
          {
            id: 38,
            name: "GOtv Smallie - quarterly N2,100",
            code: "gotv-smallie-3months",
            amount: "2100",
          },
          {
            id: 39,
            name: "GOtv Smallie - yearly N6,200",
            code: "gotv-smallie-1year",
            amount: "6200",
          },
          {
            id: 56,
            name: "GOtv Supa - monthly N5,500",
            code: "gotv-supa",
            amount: "5500.00",
          },
        ],
      };

      mockGetRequest.mockResolvedValue(expectedResponse);

      const res = await billsPayment.tvProviderPackages(provider);

      expect(mockGetRequest).toHaveBeenCalledWith(endpoint, secret_key);
      expect(res).toEqual(expectedResponse);
    });
  });

  describe("tvValidate", () => {
    it("should call #sendRequest with correct endpoint and data", async () => {
      const provider = "DSTV";
      const number = "123456789";
      const endpoint = "tv/validate";
      const expectedResponse = {
        success: true,
        code: "00000",
        message: "SUCCESSFUL",
        data: {
          orderNo: "211104130931335009",
          reference: "25696593r9622",
          status: "Delivered",
          errorMsg: null,
        },
      };

      mockSendRequest.mockResolvedValue(expectedResponse);

      const res = await billsPayment.tvValidate(provider, number);

      expect(mockSendRequest).toHaveBeenCalledWith(
        endpoint,
        {
          provider,
          number,
        },
        secret_key
      );
      expect(res).toEqual(expectedResponse);
    });
  });

  describe("tvSubscription", () => {
    it("should call #sendRequest with correct endpoint and data", async () => {
      const provider = "DSTV";
      const number = "123456789";
      const plan_id = "ABC123";
      const reference = "REF123";
      const endpoint = "tv/pay";

      const expectedResponse = { success: true };

      mockSendRequest.mockResolvedValue(expectedResponse);

      const res = await billsPayment.tvSubscription(
        provider,
        number,
        plan_id,
        reference
      );

      expect(mockSendRequest).toHaveBeenCalledWith(
        endpoint,
        {
          provider,
          number,
          code: plan_id,
          reference,
        },
        secret_key
      );
      expect(res).toEqual(expectedResponse);
    });
  });

  describe("electricityProviders", () => {
    it("should call #sendGetRequest with correct endpoint", async () => {
      const endpoint = "electricity";
      const expectedResponse = {
        success: true,
        code: "00000",
        message: "Fetched successfully",
        data: [
          {
            provider: "IKEDC",
            code: "ikeja-electric",
            providerLogoUrl:
              "assets/images/bills/Ikeja-Electric-Payment-PHCN.jpg",
            minAmount: "500",
          },
          {
            provider: "EKEDC",
            code: "eko-electric",
            providerLogoUrl:
              "assets/images/bills/Eko-Electric-Payment-PHCN.jpg",
            minAmount: "500",
          },
          {
            provider: "KEDCO",
            code: "kano-electric",
            providerLogoUrl: "assets/images/bills/Kano-Electric.jpg",
            minAmount: "500",
          },
          {
            provider: "PHED",
            code: "portharcourt-electric",
            providerLogoUrl: "assets/images/bills/Port-Harcourt-Electric.jpg",
            minAmount: "500",
          },
          {
            provider: "JED",
            code: "jos-electric",
            providerLogoUrl: "assets/images/bills/Jos-Electric-JED.jpg",
            minAmount: "500",
          },
          {
            provider: "IBEDC",
            code: "ibadan-electric",
            providerLogoUrl:
              "assets/images/bills/IBEDC-Ibadan-Electricity-Distribution-Company.jpg",
            minAmount: "500",
          },
          {
            provider: "KAEDCO",
            code: "kaduna-electric",
            providerLogoUrl: "assets/images/bills/Kaduna-Electric-KAEDCO.jpg",
            minAmount: "500",
          },
          {
            provider: "AEDC",
            code: "abuja-electric",
            providerLogoUrl: "assets/images/bills/Abuja-Electric.jpg",
            minAmount: "500",
          },
        ],
      };

      mockGetRequest.mockResolvedValue(expectedResponse);

      const res = await billsPayment.electricityProviders();

      expect(apiGetRequest).toHaveBeenCalledWith(endpoint, secret_key);
      expect(res).toEqual(expectedResponse);
    });
  });

  describe("electricityValidate", () => {
    it("should call #sendRequest with correct endpoint and data", async () => {
      const provider = "IBEDC";
      const type = "Prepaid";
      const number = "1111111111111";

      const endpoint = "electricity/validate";

      const expectedResponse = {
        success: true,
        code: "00000",
        message: "Fetched successfully",
        data: {
          provider: "IBEDC",
          number: "1111111111111",
          type: "prepaid",
          Customer_Name: "OLADIPO OLUWAFEMI",
        },
      };

      mockSendRequest.mockResolvedValue(expectedResponse);

      const res = await billsPayment.electricityValidate(
        provider,
        type,
        number
      );

      expect(mockSendRequest).toHaveBeenCalledWith(
        endpoint,
        {
          provider,
          type,
          number,
        },
        secret_key
      );
      expect(res).toEqual(expectedResponse);
    });
  });

  describe("electricityRecharge", () => {
    it("should call #sendRequest with correct endpoint and data", async () => {
      const provider = "IKEDC";
      const number = "1111111111111";
      const type = "prepaid";
      const amount = "1000";
      const reference = "2022051105275457530";
      const endpoint = "electricity/recharge";
      const expectedResponse = { success: true };

      mockSendRequest.mockResolvedValue(expectedResponse);

      const res = await billsPayment.electricityRecharge(
        provider,
        number,
        type,
        amount,
        reference
      );

      expect(mockSendRequest).toHaveBeenCalledWith(
        endpoint,
        {
          provider,
          number,
          type,
          amount,
          reference,
        },
        secret_key
      );
      expect(res).toEqual(expectedResponse);
    });
  });
});
