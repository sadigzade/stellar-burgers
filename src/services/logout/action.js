import { BURGER_API_URL, checkResponse } from "../../utils/burger-api";
import { getCookie } from "../../utils/cookie";
import {
  LOGOUT_REQUEST,
  LOGOUT_REQUEST_ERROR,
  LOGOUT_STATE_RESET,
  LOGOUT_REQUEST_SUCCESS,
} from "../constants";

const logoutRequest = () => {
  return {
    type: LOGOUT_REQUEST,
  };
};

const logoutRequestSuccess = (data) => {
  return {
    type: LOGOUT_REQUEST_SUCCESS,
    data,
  };
};

const logoutRequestError = (error) => {
  return {
    type: LOGOUT_REQUEST_ERROR,
    error,
  };
};

export const logoutStateReset = () => {
  return {
    type: LOGOUT_STATE_RESET,
  };
};

export const logoutRequestAsync = () => async (dispatch) => {
  dispatch(logoutRequest());

  try {
    const response = await fetch(`${BURGER_API_URL}/auth/logout`, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify({ token: getCookie("refreshToken") }),
    });

    const data = await checkResponse(response);

    dispatch(logoutRequestSuccess(data));
  } catch (error) {
    dispatch(logoutRequestError(error));
  }
};
