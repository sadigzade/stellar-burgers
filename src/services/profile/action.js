import { BURGER_API_URL, checkResponse } from "../../utils/burger-api";
import { getCookie } from "../../utils/cookie";
import {
  PROFILE_REQUEST,
  PROFILE_REQUEST_ERROR,
  PROFILE_STATE_RESET,
  PROFILE_REQUEST_SUCCESS,
  GET_PROFILE,
  UPDATE_PROFILE,
} from "../constants";
import { updateTokenRequestAsync } from "../token/action";

export const profileRequest = () => {
  return {
    type: PROFILE_REQUEST,
  };
};

export const profileRequestSuccess = (data) => {
  return {
    type: PROFILE_REQUEST_SUCCESS,
    data,
  };
};

export const profileRequestError = (error) => {
  return {
    type: PROFILE_REQUEST_ERROR,
    error,
  };
};

export const profileStateReset = () => {
  return {
    type: PROFILE_STATE_RESET,
  };
};

export const profileRequestAsync = () => async (dispatch) => {
  dispatch(profileRequest());

  try {
    const response = await fetch(`${BURGER_API_URL}/auth/user`, {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getCookie("accessToken"),
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
    });

    const data = await checkResponse(response);

    dispatch(profileRequestSuccess(data));
  } catch (error) {
    dispatch(profileRequestError(error));

    if (error.message === "jwt expired") {
      dispatch(updateTokenRequestAsync({ type: GET_PROFILE }));
    }
  }
};

export const profileRequestUpdate = (form) => async (dispatch) => {
  dispatch(profileRequest());

  try {
    const response = await fetch(`${BURGER_API_URL}/auth/user`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getCookie("accessToken"),
      },
      body: JSON.stringify(form),
    });

    const data = await checkResponse(response);

    dispatch(profileRequestSuccess(data));
  } catch (error) {
    dispatch(profileRequestError(error));

    if (error.message === "jwt expired") {
      dispatch(updateTokenRequestAsync({ type: UPDATE_PROFILE, form }));
    }
  }
};

export const checkUserAuth = () => (dispatch) => {
  if (getCookie("accessToken")) {
    dispatch(profileRequestAsync());
  }
};
