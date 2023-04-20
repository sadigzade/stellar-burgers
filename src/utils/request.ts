export const BURGER_API = "https://norma.nomoreparties.space/api";
export const WS_API = "wss://norma.nomoreparties.space";

export const checkResponse = (res: Response) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const request = async (endpoint: string, options = {}) => {
  const res = await fetch(`${BURGER_API}${endpoint}`, options);
  return checkResponse(res);
};
