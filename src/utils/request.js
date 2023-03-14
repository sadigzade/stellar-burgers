export const BURGER_API = "https://norma.nomoreparties.space/api";

export const checkResponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const request = async (endpoint, options = {}) => {
  const res = await fetch(`${BURGER_API}${endpoint}`, options);
  return checkResponse(res);
};
