import {
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_REQUEST_ERROR,
  FORGOT_PASSWORD_REQUEST_SUCCESS,
  FORGOT_PASSWORD_RESET,
} from "../constants";

const initialState = {
  loading: false,
  error: "",
  success: false,
};

export const forgotPasswordReducer = (state = initialState, action) => {
  switch (action.type) {
    case FORGOT_PASSWORD_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case FORGOT_PASSWORD_REQUEST_SUCCESS: {
      return {
        ...state,
        success: action.data.success,
        loading: false,
      };
    }
    case FORGOT_PASSWORD_REQUEST_ERROR: {
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    }
    case FORGOT_PASSWORD_RESET: {
      return {
        ...state,
        success: initialState.success,
      };
    }
    default: {
      return state;
    }
  }
};
