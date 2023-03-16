import { setCookie } from "../../utils/cookie";
import { UPDATE_TOKEN_REQUEST_ERROR, UPDATE_TOKEN_REQUEST_SUCCESS } from "../constants";

const initialState = {
  error: "",
};

export const updateTokenReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_TOKEN_REQUEST_SUCCESS: {
      const accessToken = action.data.accessToken.split("Bearer ")[1];
      const refreshToken = action.data.refreshToken;

      setCookie("accessToken", accessToken);
      setCookie("refreshToken", refreshToken);

      return initialState;
    }
    case UPDATE_TOKEN_REQUEST_ERROR: {
      return {
        ...state,
        error: action.error,
      };
    }
    default: {
      return state;
    }
  }
};
