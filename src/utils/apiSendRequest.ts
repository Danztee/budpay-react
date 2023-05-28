const BASE_URL = "https://api.budpay.com/api/v2/";

export default async function apiSendRequest(
  endpoint: string,
  data: object | string,
  secret_key: string,
  url_link?: string
) {
  const url = url_link ? `${url_link}${endpoint}` : `${BASE_URL}${endpoint}`;

  const endpointsRequiringEncryption = [
    "bank_transfer",
    "bulk_bank_transfer",
    "airtime/topup",
    "internet/data",
    "tv/pay",
    "electricity/recharge",
  ];

  try {
    const headers: { [key: string]: string } = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${secret_key}`,
    };

    if (endpointsRequiringEncryption.includes(endpoint)) {
      headers.Encryption = "Signature_HMAC-SHA-512";
    }

    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    });

    console.log(response);

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error(`${endpoint} Error:`, error);
    throw new Error(`Error occurred while making a request to ${endpoint}`);
  }
}
