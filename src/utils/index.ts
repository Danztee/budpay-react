const BASE_URL = "https://api.budpay.com/api/v2/";

export default async function apiRequest(
  endpoint: string,
  verification_data: any,
  secret_key: string
) {
  const url = `${BASE_URL}${endpoint}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return `${endpoint} Verification Error: ${error}`;
  }
}
