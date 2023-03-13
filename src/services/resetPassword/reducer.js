import {
  RESET_PASSWORD_INITIAL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_REQUEST_ERROR,
  RESET_PASSWORD_REQUEST_SUCCESS,
} from "../constants";

const initialState = {
  loading: false,
  error: "",
  success: false,
};

export const resetPasswordReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESET_PASSWORD_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case RESET_PASSWORD_REQUEST_SUCCESS: {
      return {
        ...state,
        success: action.data.success,
        loading: false,
      };
    }
    case RESET_PASSWORD_REQUEST_ERROR: {
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    }
    case RESET_PASSWORD_INITIAL: {
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
