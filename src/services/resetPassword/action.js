import { request } from "../../utils/request";
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
    const data = await request("/password-reset/reset", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    dispatch(resetPasswordRequestSuccess(data));
  } catch (error) {
    dispatch(resetPasswordRequestError(error));
  }
};
