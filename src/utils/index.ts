const BASE_URL = "https://api.budpay.com/api/v2/";

export default async function apiRequest(
  endpoint: string,
  payment_data: object,
  secret_key: string
) {
  const url = `${BASE_URL}${endpoint}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${secret_key}`,
      },
      body: JSON.stringify(payment_data),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return `${endpoint} Verification Error: ${error}`;
  }
}
