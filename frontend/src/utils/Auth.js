export const BASE_URL = "https://api.bmesto.nomoredomains.monster";

function getResponseData(response) {
  if (!response.ok) {
    return Promise.reject(`Ошибка: ${response.status}`);
  }
  return response.json();
}

function request(url, options) {
  return fetch(`${BASE_URL}${url}`, options).then(getResponseData);
}

export function register(password, email) {
  return request("/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, email }),
  });
}

export function authorize(password, email) {
  return request(`/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, email }),
  });
}

export function checkToken(token) {
  return request(`/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}
