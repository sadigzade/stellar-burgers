import thunk from "redux-thunk";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";

import { rootReducer } from "./reducers";
import { socketMiddleware } from "./middleware/socket-middleware";
import { WS_CONNECTION_START, WS_DISCONNECTING } from "./constants/wsActionTypes";
import { TWSStoreActions } from "./types/data";

import {
  wsConnectionClosed,
  wsConnectionError,
  wsConnectionSuccess,
  wsGetMessage,
} from "./actions/wsActions";

const wsActions: TWSStoreActions = {
  wsInit: WS_CONNECTION_START,
  wsDisconnecting: WS_DISCONNECTING,
  wsConnectionSuccess,
  wsConnectionError,
  wsConnectionClosed,
  wsGetMessage,
};

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(socketMiddleware(wsActions), thunk)),
);
