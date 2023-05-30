import AcceptPayment from "./modules/AcceptPayment";
import BillsPayment from "./modules/BillsPayment";
import IdentityVerification from "./modules/IdentityVerification";
import PaymentFeatures from "./modules/PaymentFeatures";
import Payouts from "./modules/Payouts";

class BudPay {
  acceptPayment: AcceptPayment;
  paymentFeatures: PaymentFeatures;
  payouts: Payouts;
  billsPayment: BillsPayment;
  identityVerification: IdentityVerification;

  /**
   * Create an instance of BudPay.
   * @param {Object} config - Configuration object.
   * @param {string} secret_key - Your secret key.
   * @param {string} signature - Your HMAC Signature.
   */
  constructor(config: { secret_key: string; signature: string }) {
    this.acceptPayment = new AcceptPayment(config);
    this.paymentFeatures = new PaymentFeatures(config);
    this.payouts = new Payouts(config);
    this.billsPayment = new BillsPayment(config);
    this.identityVerification = new IdentityVerification(config);
  }
}

export default BudPay;
