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

  constructor(secret_key: string) {
    this.acceptPayment = new AcceptPayment(secret_key);
    this.paymentFeatures = new PaymentFeatures(secret_key);
    this.payouts = new Payouts(secret_key);
    this.billsPayment = new BillsPayment(secret_key);
    this.identityVerification = new IdentityVerification(secret_key);
  }
}

export default BudPay;
