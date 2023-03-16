import { request } from "../../utils/request";
import {
  INGREDIENTS_COUNT_RESET,
  INGREDIENTS_MINUS_COUNT,
  INGREDIENTS_PLUS_COUNT,
  INGREDIENTS_REQUEST_ERROR,
  INGREDIENTS_REQUEST_SUCCESS,
} from "../constants";

const ingredientsRequestSuccess = (data) => {
  return {
    type: INGREDIENTS_REQUEST_SUCCESS,
    ingredients: data,
  };
};

const ingredientsRequestError = () => {
  return {
    type: INGREDIENTS_REQUEST_ERROR,
  };
};

export const ingredientsCountReset = () => {
  return {
    type: INGREDIENTS_COUNT_RESET,
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
  try {
    const data = await request("/ingredients");

    dispatch(ingredientsRequestSuccess(data.data));
  } catch (error) {
    dispatch(ingredientsRequestError());
  }
};
