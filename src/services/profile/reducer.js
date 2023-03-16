import {
  PROFILE_REQUEST,
  PROFILE_REQUEST_ERROR,
  PROFILE_STATE_RESET,
  PROFILE_REQUEST_SUCCESS,
} from "../constants";

const initialState = {
  loading: false,
  error: "",
  user: null,
};

export const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case PROFILE_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case PROFILE_REQUEST_SUCCESS: {
      return {
        ...state,
        user: action.data.user,
        loading: false,
      };
    }
    case PROFILE_REQUEST_ERROR: {
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    }
    case PROFILE_STATE_RESET: {
      return initialState;
    }
    default: {
      return state;
    }
  }
};
