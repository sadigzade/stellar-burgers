import { deleteCookie, getCookie } from "../../utils/cookie";
import { request } from "../../utils/request";
import {
  LOGIN_REQUEST,
  LOGIN_REQUEST_ERROR,
  LOGIN_REQUEST_SUCCESS,
  LOGIN_STATE_RESET,
  LOGOUT_REQUEST_ERROR,
} from "../constants";
import { checkUserAuth, profileStateReset } from "../profile/action";

const loginRequest = () => {
  return {
    type: LOGIN_REQUEST,
  };
};

const loginRequestSuccess = (data) => {
  return {
    type: LOGIN_REQUEST_SUCCESS,
    data,
  };
};

const loginRequestError = (error) => {
  return {
    type: LOGIN_REQUEST_ERROR,
    error,
  };
};

const logoutRequestError = (error) => {
  return {
    type: LOGOUT_REQUEST_ERROR,
    error,
  };
};

export const loginStateReset = () => {
  return {
    type: LOGIN_STATE_RESET,
  };
};

export const loginRequestAsync = (form) => async (dispatch) => {
  dispatch(loginRequest());

  try {
    const data = await request("/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    dispatch(loginRequestSuccess(data));
    dispatch(checkUserAuth());
  } catch (error) {
    dispatch(loginRequestError(error));
  }
};

export const logoutRequestAsync = () => async (dispatch) => {
  try {
    await request("/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: getCookie("refreshToken") }),
    });

    dispatch(loginStateReset());
    dispatch(profileStateReset());

    deleteCookie("accessToken");
    deleteCookie("refreshToken");
  } catch (error) {
    dispatch(logoutRequestError(error));
  }
};
