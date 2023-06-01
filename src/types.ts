export type Config = {
  secret_key: string;
  signature: string;
};

export type StandardCheckout = {
  email: string;
  amount: string;
  currency?: string;
  reference?: string;
  callback?: string;
};

export type ServerToServer = {
  amount: string;
  card: string;
  callback: string;
  currency: string;
  email: string;
  reference: string;
  pin?: string;
};

export type ServerToServerBankTransferCheckout = {
  email: string;
  amount: string;
  reference: string;
  name: string;
  currency: string;
};

export type ServerToServerV2 = {
  amount: string;
  card: string;
  email: string;
  reference: string;
  currency?: string;
};

export type RequestPayment = {
  recipient: string;
  amount: string;
  currency: string;
  description: string;
};

export type CreatePaymentLink = {
  amount: string;
  currency: string;
  name: string;
  description: string;
  redirect: string;
};

export type CreateCustomer = {
  email: string;
  first_name: string;
  last_name: string;
  phone?: string;
  metadata?: string;
};

export type CreateDedicatedVirtualAccount = {
  customer: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
};

export type CreateRefund = {
  reference: string;
  customer_note?: string;
  merchant_note?: string;
};

export type SinglePayout = {
  currency: string;
  amount: string;
  bank_code: string;
  bank_name: string;
  account_number: string;
  narration: string;
  paymentMode?: string;
  reference?: string;
};

export type BulkTransfer = {
  currency: string;
  transfers: {
    amount: string;
    bank_code: string;
    bank_name: string;
    account_number: string;
    narration: string;
    reference?: string;
  }[];
};

export type PayoutFee = {
  currency: string;
  amount: string;
};

export type AirtimeTopUp = {
  provider: string;
  number: string;
  amount: string;
  reference: string;
};

export type InternetDataPurchase = {
  provider: string;
  number: string;
  plan_id: string;
  reference: string;
};

export type TvValidate = {
  provider: string;
  number: string;
};

export type TvSubscription = {
  provider: string;
  number: string;
  plan_id: string;
  reference: string;
};

export type ElectricityValidate = {
  provider: string;
  type: string;
  number: string;
};

export type ElectricityRecharge = {
  provider: string;
  number: string;
  type: string;
  amount: string;
  reference: string;
};

export type AccountNameVerify = {
  bank_code: string;
  account_number: string;
};

export type verifyBVN = {
  bvn: string;
  callback_url: string;
  first_name?: string;
  middle_name?: string;
  last_name?: string;
  phone_number?: string;
  dob?: string;
  gender?: string;
  reference?: string;
};
