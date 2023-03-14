import { getCookie } from "../../utils/cookie";
import { request } from "../../utils/request";
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

export const updateTokenRequestAsync = (options) => async (dispatch) => {
  try {
    const data = await request("/auth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: getCookie("refreshToken"),
      }),
    });

    dispatch(updateTokenRequestSuccess(data));

    switch (options.type) {
      case GET_PROFILE: {
        dispatch(profileRequestAsync());
        break;
      }
      case UPDATE_PROFILE: {
        dispatch(profileRequestUpdate(options.form));
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
