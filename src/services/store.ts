import thunk from "redux-thunk";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";

import { rootReducer } from "./reducers";
import { socketMiddleware } from "./middleware/socket-middleware";
import { WS_CONNECTION_START, WS_DISCONNECTING } from "./constants/wsActionTypes";
import { TWSStoreActions } from "./types/data";

const wsActions: TWSStoreActions = {
  wsInit: WS_CONNECTION_START,
  wsDisconnecting: WS_DISCONNECTING,
};

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(socketMiddleware(wsActions), thunk)),
);
