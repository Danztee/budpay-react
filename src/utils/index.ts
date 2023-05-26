const BASE_URL = "https://api.budpay.com/api/v2/";

export default async function apiSendRequest(
  endpoint: string,
  _data: object | string,
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
      body: JSON.stringify(_data),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    return `${endpoint} Error: ${error}`;
  }
}

export async function apiGetRequest(
  endpoint: string,
  secret_key: string,
  url_link?: string
) {
  const url = url_link ? `${url_link}${endpoint}` : `${BASE_URL}${endpoint}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${secret_key}`,
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    return `${endpoint} Error: ${error}`;
  }
}
