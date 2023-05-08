import type { WsActions } from "../../actions/wsActions";
import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_SUCCESS,
  WS_DISCONNECTING,
  WS_GET_MESSAGE,
} from "../../constants/wsActionTypes";
import { TWSOrders } from "../../types/data";

type WSState = {
  wsConnected: boolean;
  orders: ReadonlyArray<TWSOrders>;
  total: number;
  totalToday: number;

  error?: Event;
};

const initialState: WSState = {
  wsConnected: false,
  orders: [],
  total: 0,
  totalToday: 0,
};

export const wsReducer = (state = initialState, action: WsActions) => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS: {
      return {
        ...state,
        wsConnected: true,
        error: undefined,
      };
    }
    case WS_CONNECTION_ERROR: {
      return {
        ...state,
        wsConnected: false,
        error: action.payload,
      };
    }
    case WS_CONNECTION_CLOSED: {
      return initialState;
    }
    case WS_GET_MESSAGE: {
      const { orders, total, totalToday } = action.data;

      return {
        ...state,
        orders,
        total,
        totalToday,
        error: undefined,
      };
    }
    case WS_DISCONNECTING: {
      return initialState;
    }
    default: {
      return state;
    }
  }
};
