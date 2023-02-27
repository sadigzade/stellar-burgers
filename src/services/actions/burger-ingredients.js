import { BURGER_API_URL, checkResponse } from "../../utils/burger-api";
import {
  INGREDIENTS_MINUS_COUNT,
  INGREDIENTS_PLUS_COUNT,
  INGREDIENTS_REQUEST,
  INGREDIENTS_REQUEST_FAILED,
  INGREDIENTS_REQUEST_SUCCESS,
} from "./constants";

const ingredientsRequest = () => {
  return {
    type: INGREDIENTS_REQUEST,
  };
};

const ingredientsRequestSuccess = (data) => {
  return {
    type: INGREDIENTS_REQUEST_SUCCESS,
    ingredients: data,
  };
};

const ingredientsRequestFailed = () => {
  return {
    type: INGREDIENTS_REQUEST_FAILED,
  };
};

export const ingredientPlusCount = (ingredientId) => {
  return {
    type: INGREDIENTS_PLUS_COUNT,
    ingredientId,
  };
};

export const ingredientMinusCount = (ingredientId) => {
  return {
    type: INGREDIENTS_MINUS_COUNT,
    ingredientId,
  };
};

export const ingredientsRequestAsync = () => async (dispatch) => {
  dispatch(ingredientsRequest());

  try {
    const res = await fetch(`${BURGER_API_URL}/ingredients`);
    const data = await checkResponse(res);

    dispatch(ingredientsRequestSuccess(data.data));
  } catch (error) {
    console.log(error);
    dispatch(ingredientsRequestFailed());
  }
};
