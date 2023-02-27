import { BURGER_API_URL, checkResponse } from "../../utils/burger-api";
import {
  ORDER_NUMBER_REQUEST,
  ORDER_NUMBER_REQUEST_FAILD,
  ORDER_NUMBER_REQUEST_SUCCESS,
  ORDER_NUMBER_RESET,
} from "./constants";

const orderNumberRequest = () => {
  return {
    type: ORDER_NUMBER_REQUEST,
  };
};

const orderNumberRequestSuccess = (number) => {
  return {
    type: ORDER_NUMBER_REQUEST_SUCCESS,
    number,
  };
};

const orderNumberRequestFailed = () => {
  return {
    type: ORDER_NUMBER_REQUEST_FAILD,
  };
};

export const orderNumberReset = () => {
  return {
    type: ORDER_NUMBER_RESET,
  };
};

export const orderNumberRequestAsync = (ingredientsId) => async (dispatch) => {
  dispatch(orderNumberRequest());

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

    dispatch(orderNumberRequestSuccess(data.order.number));
  } catch (error) {
    console.log(error);
    dispatch(orderNumberRequestFailed());
  }
};
