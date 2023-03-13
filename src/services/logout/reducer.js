import {
  LOGOUT_REQUEST,
  LOGOUT_REQUEST_ERROR,
  LOGOUT_STATE_RESET,
  LOGOUT_REQUEST_SUCCESS,
} from "../constants";

const initialState = {
  loading: false,
  error: "",
  success: false,
};

export const logoutReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGOUT_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case LOGOUT_REQUEST_SUCCESS: {
      return {
        ...state,
        success: action.data.success,
        loading: false,
      };
    }
    case LOGOUT_REQUEST_ERROR: {
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    }
    case LOGOUT_STATE_RESET: {
      return initialState;
    }
    default: {
      return state;
    }
  }
};
