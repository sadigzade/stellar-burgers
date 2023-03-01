import {
  ORDER_NUMBER_REQUEST,
  ORDER_NUMBER_REQUEST_FAILD,
  ORDER_NUMBER_REQUEST_SUCCESS,
  ORDER_NUMBER_RESET,
} from "../actions/constants";

const initialState = {
  order: null,
};

export const orderModalReducer = (state = initialState, action) => {
  switch (action.type) {
    case ORDER_NUMBER_REQUEST: {
      return state;
    }
    case ORDER_NUMBER_REQUEST_SUCCESS: {
      return {
        ...state,
        order: action.number,
      };
    }
    case ORDER_NUMBER_REQUEST_FAILD: {
      return state;
    }
    case ORDER_NUMBER_RESET: {
      return initialState;
    }
    default: {
      return state;
    }
  }
};
