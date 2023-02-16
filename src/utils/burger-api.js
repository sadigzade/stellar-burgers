export const BURGER_API_URL = "https://norma.nomoreparties.space/api";

const checkResponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export function getIngredients() {
  return fetch(`${BURGER_API_URL}/ingredients`).then(checkResponse);
}

export function postOrderNumber(ingredientsId) {
  return fetch(`${BURGER_API_URL}/orders`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ingredients: ingredientsId,
    }),
  }).then(checkResponse);
}
