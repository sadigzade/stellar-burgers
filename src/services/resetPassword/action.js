import { BURGER_API_URL, checkResponse } from "../../utils/burger-api";
import {
  RESET_PASSWORD_INITIAL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_REQUEST_ERROR,
  RESET_PASSWORD_REQUEST_SUCCESS,
} from "../constants";

const resetPasswordRequest = () => {
  return {
    type: RESET_PASSWORD_REQUEST,
  };
};

const resetPasswordRequestSuccess = (data) => {
  return {
    type: RESET_PASSWORD_REQUEST_SUCCESS,
    data,
  };
};

const resetPasswordRequestError = (error) => {
  return {
    type: RESET_PASSWORD_REQUEST_ERROR,
    error,
  };
};

export const resetPasswordInitial = () => {
  return {
    type: RESET_PASSWORD_INITIAL,
  };
};

export const resetPasswordRequestAsync = (form) => async (dispatch) => {
  dispatch(resetPasswordRequest());

  try {
    const response = await fetch(`${BURGER_API_URL}/password-reset/reset`, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(form),
    });

    const data = await checkResponse(response);

    dispatch(resetPasswordRequestSuccess(data));
  } catch (error) {
    dispatch(resetPasswordRequestError(error));
  }
};
