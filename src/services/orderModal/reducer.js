import {
  ORDER_NUMBER_REQUEST_ERROR,
  ORDER_NUMBER_REQUEST_SUCCESS,
  ORDER_NUMBER_RESET,
} from "../constants";

const initialState = {
  error: null,
  order: null,
};

export const orderModalReducer = (state = initialState, action) => {
  switch (action.type) {
    case ORDER_NUMBER_REQUEST_SUCCESS: {
      return {
        ...state,
        order: action.number,
      };
    }
    case ORDER_NUMBER_REQUEST_ERROR: {
      return {
        ...state,
        error: action.error,
      };
    }
    case ORDER_NUMBER_RESET: {
      return initialState;
    }
    default: {
      return state;
    }
  }
};
