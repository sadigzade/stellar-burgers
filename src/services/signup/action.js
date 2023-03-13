import { BURGER_API_URL, checkResponse } from "../../utils/burger-api";
import { SIGN_UP_REQUEST, SIGN_UP_REQUEST_ERROR, SIGN_UP_REQUEST_SUCCESS } from "../constants";

const signupRequest = () => {
  return {
    type: SIGN_UP_REQUEST,
  };
};

const signupRequestSuccess = (data) => {
  return {
    type: SIGN_UP_REQUEST_SUCCESS,
    data,
  };
};

const signupRequestError = (error) => {
  return {
    type: SIGN_UP_REQUEST_ERROR,
    error,
  };
};

export const signupRequestAsync = (form) => async (dispatch) => {
  dispatch(signupRequest());

  try {
    const response = await fetch(`${BURGER_API_URL}/auth/register`, {
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

    dispatch(signupRequestSuccess(data));
  } catch (error) {
    dispatch(signupRequestError(error));
  }
};
