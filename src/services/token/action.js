import { BURGER_API_URL, checkResponse } from "../../utils/burger-api";
import { getCookie } from "../../utils/cookie";
import {
  GET_PROFILE,
  UPDATE_PROFILE,
  UPDATE_TOKEN_REQUEST_ERROR,
  UPDATE_TOKEN_REQUEST_SUCCESS,
} from "../constants";
import { profileRequestAsync, profileRequestUpdate } from "../profile/action";

export const updateTokenRequestSuccess = (data) => {
  return {
    type: UPDATE_TOKEN_REQUEST_SUCCESS,
    data,
  };
};

export const updateTokenRequestError = (error) => {
  return {
    type: UPDATE_TOKEN_REQUEST_ERROR,
    error,
  };
};

export const updateTokenRequestAsync = (request) => async (dispatch) => {
  try {
    const response = await fetch(`${BURGER_API_URL}/auth/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: getCookie("refreshToken"),
      }),
    });

    const data = await checkResponse(response);

    dispatch(updateTokenRequestSuccess(data));

    switch (request.type) {
      case GET_PROFILE: {
        dispatch(profileRequestAsync());
        break;
      }
      case UPDATE_PROFILE: {
        dispatch(profileRequestUpdate(request.form));
        break;
      }
      default: {
        break;
      }
    }
  } catch (error) {
    dispatch(updateTokenRequestError(error));
  }
};
