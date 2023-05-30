import BudPay from "./../src";
import AcceptPayment from "./../src/modules/AcceptPayment";
import BillsPayment from "./../src/modules/BillsPayment";
import IdentityVerification from "./../src/modules/IdentityVerification";
import PaymentFeatures from "./../src/modules/PaymentFeatures";
import Payouts from "./../src/modules/Payouts";

describe("BudPay", () => {
  const config = {
    secret_key: "your-secret-key",
    signature: "your-HMAC-Signature",
  };

  let budPay: BudPay;

  beforeEach(() => {
    budPay = new BudPay(config);
  });

  it("should create an instance of AcceptPayment module", () => {
    expect(budPay.acceptPayment).toBeInstanceOf(AcceptPayment);
    // expect(budPay.acceptPayment.secret_key).toBe(secretKey);
  });

  it("should create an instance of PaymentFeatures module", () => {
    expect(budPay.paymentFeatures).toBeInstanceOf(PaymentFeatures);
    // expect(budPay.paymentFeatures.secretKey).toBe(secretKey);
  });

  it("should create an instance of Payouts module", () => {
    expect(budPay.payouts).toBeInstanceOf(Payouts);
    // expect(budPay.payouts.secretKey).toBe(secretKey);
  });

  it("should create an instance of BillsPayment module", () => {
    expect(budPay.billsPayment).toBeInstanceOf(BillsPayment);
    // expect(budPay.billsPayment.secretKey).toBe(secretKey);
  });

  it("should create an instance of IdentityVerification module", () => {
    expect(budPay.identityVerification).toBeInstanceOf(IdentityVerification);
    // expect(budPay.identityVerification.secretKey).toBe(secretKey);
  });
});
