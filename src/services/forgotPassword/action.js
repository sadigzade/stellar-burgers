import { request } from "../../utils/request";
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
    const data = await request("/password-reset", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    dispatch(forgotPasswordRequestSuccess(data));
  } catch (error) {
    dispatch(forgotPasswordRequestError(error));
  }
};
