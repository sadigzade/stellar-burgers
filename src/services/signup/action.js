import { request } from "../../utils/request";
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
    const data = await request("/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    dispatch(signupRequestSuccess(data));
  } catch (error) {
    dispatch(signupRequestError(error));
  }
};
