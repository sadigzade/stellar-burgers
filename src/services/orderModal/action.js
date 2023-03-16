import { request } from "../../utils/request";
import { ingredientsCountReset } from "../burgerIngredients/action";
import {
  ORDER_NUMBER_REQUEST_ERROR,
  ORDER_NUMBER_REQUEST_SUCCESS,
  ORDER_NUMBER_RESET,
} from "../constants";
import { constructorReset } from "../constructorIngredients/action";

const orderNumberRequestSuccess = (number) => {
  return {
    type: ORDER_NUMBER_REQUEST_SUCCESS,
    number,
  };
};

const orderNumberRequestError = (error) => {
  return {
    type: ORDER_NUMBER_REQUEST_ERROR,
    error,
  };
};

export const orderNumberReset = () => {
  return {
    type: ORDER_NUMBER_RESET,
  };
};

export const orderNumberRequestAsync = (ingredientsId) => async (dispatch) => {
  try {
    const data = await request("/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ingredients: ingredientsId,
      }),
    });

    dispatch(orderNumberRequestSuccess(data.order));
    dispatch(constructorReset());
    dispatch(ingredientsCountReset());
  } catch (error) {
    dispatch(orderNumberRequestError(error));
  }
};
