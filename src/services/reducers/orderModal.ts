import { OrderModalActions } from "../actions/orderModal";
import {
  ORDER_NUMBER_REQUEST,
  ORDER_NUMBER_REQUEST_ERROR,
  ORDER_NUMBER_REQUEST_SUCCESS,
  ORDER_NUMBER_RESET,
} from "../constants/orderModal";
import { TOrder, TRequestData } from "../types/data";

type OrderModalState = {
  status: boolean;
  order: Readonly<TOrder> | null;
  error: Readonly<TRequestData> | null;
};

const initialState: OrderModalState = {
  status: false,
  order: null,
  error: null,
};

export const orderModalReducer = (
  state = initialState,
  action: OrderModalActions,
): OrderModalState => {
  switch (action.type) {
    case ORDER_NUMBER_REQUEST: {
      return {
        ...state,
        status: true,
      };
    }
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
