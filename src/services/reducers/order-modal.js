import {
  ORDER_NUMBER_REQUEST,
  ORDER_NUMBER_REQUEST_FAILD,
  ORDER_NUMBER_REQUEST_SUCCESS,
  ORDER_NUMBER_RESET,
} from "../actions/constants";

const initialState = {
  orderNumberRequest: false,
  orderNumberFailed: false,
  modalVisible: false,
  number: null,
};

export const orderModalReducer = (state = initialState, action) => {
  switch (action.type) {
    case ORDER_NUMBER_REQUEST: {
      return {
        ...state,
        orderNumberRequest: true,
        orderNumberFailed: false,
      };
    }
    case ORDER_NUMBER_REQUEST_SUCCESS: {
      return {
        ...state,
        orderNumberRequest: false,
        modalVisible: true,
        number: action.number,
      };
    }
    case ORDER_NUMBER_REQUEST_FAILD: {
      return {
        ...state,
        orderNumberRequest: false,
        orderNumberFailed: true,
        modalVisible: false,
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
