import AcceptPayment from "../src/modules/AcceptPayment";
import apiSendRequest from "../src/utils/apiSendRequest";

jest.mock("../src/utils/apiSendRequest");

describe("AcceptPayment", () => {
  let acceptPayment: AcceptPayment;
  const mockSendRequest = apiSendRequest as jest.Mock;

  beforeEach(() => {
    acceptPayment = new AcceptPayment("your_secret_key");
    mockSendRequest.mockClear();
  });

  describe("standardCheckout", () => {
    it("should perform standard checkout", async () => {
      const email = "test@example.com";
      const amount = "100";
      const currency = "USD";
      const reference = "123456";
      const callback = "https://example.com/callback";

      const data = { email, amount, currency, reference, callback };
      const endpoint = "transaction/initialize";

      const response = {
        status: true,
        message: "Authorization URL created",
        data: {
          authorization_url: "https://www.budpay.com/checkout/wp5goiyvc1pt",
          access_code: "wp5goiyvc1pt",
          reference: "REF_61e469c330c2bc",
        },
      };

      mockSendRequest.mockResolvedValue(response);

      const result = await acceptPayment.standardCheckout(
        email,
        amount,
        currency,
        reference,
        callback
      );

      expect(result).toEqual(response);
      expect(mockSendRequest).toHaveBeenCalledWith(
        endpoint,
        data,
        "your_secret_key",
        undefined
      );
    });
  });

  describe("serverToServer", () => {
    it("should perform a server to server transaction", async () => {
      const amount = "2";
      const encryptedCard =
        "83fa6763bb31bae36a74f787ab814514aeede91fcdb311fd67609b414c5e5ea2751a47870c8717e71bcbc9c33287a3d6af9ffae8e2edbf2de1e2694384d699b020d31492637eef60d7a63f303798363a";
      const callback = "www.budpay.com";
      const currency = "NGN";
      const email = "test@email.com";
      const reference = "123253627873blsample29NEvccZzzl";
      const pin = "1234";

      const data = {
        amount,
        card: encryptedCard,
        callback,
        currency,
        email,
        reference,
        pin,
      };
      const endpoint = "transaction/initialize";
      const url_link = "https://api.budpay.com/api/s2s/";

      const response = {
        status: true,
        message: "Proceed authentication 3DS2",
        data: '<div id="initiate3dsSimpleRedirect" xmlns="http://www.w3.org/1999/html"> <iframe id="methodFrame" name="methodFrame" height="100" width="200" > </iframe> <form id ="initiate3dsSimpleRedirectForm" method="POST" action="https://secure-acs2ui-b1.wibmo.com/v1/acs/services/threeDSMethod/8528?cardType=M" target="methodFrame"> <input type="hidden" name="threeDSMethodData" value="eyJ0aHJlZURTTWV0aG9kTm90aWZpY2F0aW9uVVJMIjoiaHR0cHM6Ly9ldS5nYXRld2F5Lm1hc3RlcmNhcmQuY29tL2NhbGxiYWNrSW50ZXJmYWNlL2dhdGV3YXkvOGFkZGRiNzE1MTQwMjk2OWMxMmI1Y2QzNjBhOTdmYTdiZTE1ZWU1NWZiZDEwZTE5MmI3ZDIwNDcxNmQxYTVlNSIsInRocmVlRFNTZXJ2ZXJUcmFuc0lEIjoiZjgxNGM3YWMtMmRiOS00Nzg1LThhMjYtYjA2NjZlYTBjMGVkIn0=" /> </form> <script id="initiate-authentication-script"> var e=document.getElementById("initiate3dsSimpleRedirectForm"); if (e) { e.submit(); if (e.parentNode !== null) { e.parentNode.removeChild(e); } } </script> </div>',
        _links: {
          url: "http://api.budpay.com/api/mastercard-payment/3ds2auth",
          method: "POST",
          payload: ["ref"],
        },
      };

      mockSendRequest.mockResolvedValue(response);

      const result = await acceptPayment.serverToServer(
        amount,
        encryptedCard,
        callback,
        currency,
        email,
        reference,
        pin
      );

      expect(result).toEqual(response);
      expect(mockSendRequest).toHaveBeenCalledWith(
        endpoint,
        data,
        "your_secret_key",
        url_link
      );
    });
  });
});
