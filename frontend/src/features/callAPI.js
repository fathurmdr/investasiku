import axios from "axios";

export default async function callAPI({ url, method, payload, token }) {
  let headers = {};
  if (token) {
    headers = {
      Authorization: `Bearer ${token}`,
    };
  }
  const response = await axios({
    url,
    method,
    data: payload,
    headers,
  });

  return response.data;
}
