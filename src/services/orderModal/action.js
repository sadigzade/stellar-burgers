import { BURGER_API_URL, checkResponse } from "../../utils/burger-api";
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
    const res = await fetch(`${BURGER_API_URL}/orders`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ingredients: ingredientsId,
      }),
    });

    const data = await checkResponse(res);

    dispatch(orderNumberRequestSuccess(data.order));
    dispatch(constructorReset());
    dispatch(ingredientsCountReset());
  } catch (error) {
    dispatch(orderNumberRequestError(error));
  }
};
