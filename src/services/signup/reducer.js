import { setCookie } from "../../utils/cookie";
import { SIGN_UP_REQUEST, SIGN_UP_REQUEST_ERROR, SIGN_UP_REQUEST_SUCCESS } from "../constants";

const initialState = {
  loading: false,
  error: "",
  user: null,
};

export const signupReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_UP_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case SIGN_UP_REQUEST_SUCCESS: {
      const accessToken = action.data.accessToken.split("Bearer ")[1];
      const refreshToken = action.data.refreshToken;

      setCookie("accessToken", accessToken);
      setCookie("refreshToken", refreshToken);

      return {
        ...state,
        user: action.data.user,
        loading: false,
      };
    }
    case SIGN_UP_REQUEST_ERROR: {
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    }
    default: {
      return state;
    }
  }
};
