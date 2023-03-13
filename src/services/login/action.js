import { BURGER_API_URL, checkResponse } from "../../utils/burger-api";
import {
  LOGIN_REQUEST,
  LOGIN_REQUEST_ERROR,
  LOGIN_REQUEST_SUCCESS,
  LOGIN_STATE_RESET,
} from "../constants";
import { checkUserAuth } from "../profile/action";

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

export const loginStateReset = () => {
  return {
    type: LOGIN_STATE_RESET,
  };
};

export const loginRequestAsync = (form) => async (dispatch) => {
  dispatch(loginRequest());

  try {
    const response = await fetch(`${BURGER_API_URL}/auth/login`, {
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

    dispatch(loginRequestSuccess(data));
    dispatch(checkUserAuth());
  } catch (error) {
    dispatch(loginRequestError(error));
  }
};
