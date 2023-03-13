import { BURGER_API_URL, checkResponse } from "../../utils/burger-api";
import {
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_REQUEST_ERROR,
  FORGOT_PASSWORD_REQUEST_SUCCESS,
  FORGOT_PASSWORD_RESET,
} from "../constants";

const forgotPasswordRequest = () => {
  return {
    type: FORGOT_PASSWORD_REQUEST,
  };
};

const forgotPasswordRequestSuccess = (data) => {
  return {
    type: FORGOT_PASSWORD_REQUEST_SUCCESS,
    data,
  };
};

const forgotPasswordRequestError = (error) => {
  return {
    type: FORGOT_PASSWORD_REQUEST_ERROR,
    error,
  };
};

export const forgotPasswordReset = () => {
  return {
    type: FORGOT_PASSWORD_RESET,
  };
};

export const forgotPasswordRequestAsync = (form) => async (dispatch) => {
  dispatch(forgotPasswordRequest());

  try {
    const response = await fetch(`${BURGER_API_URL}/password-reset`, {
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

    dispatch(forgotPasswordRequestSuccess(data));
  } catch (error) {
    dispatch(forgotPasswordRequestError(error));
  }
};
