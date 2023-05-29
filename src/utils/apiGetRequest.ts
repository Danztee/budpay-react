const BASE_URL = "https://api.budpay.com/api/v2/";

export default async function apiGetRequest(
  endpoint: string,
  secret_key: string
) {
  const url = `${BASE_URL}${endpoint}`;

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
