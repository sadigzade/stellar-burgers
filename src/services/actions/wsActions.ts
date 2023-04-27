import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_DISCONNECTING,
  WS_GET_MESSAGE,
} from "../constants/wsActionTypes";
import { TWSGetMessage } from "../types/data";

type WSConnectionStartAction = {
  readonly type: typeof WS_CONNECTION_START;
  readonly url: string;
};
export type WSConnectionSuccessAction = {
  readonly type: typeof WS_CONNECTION_SUCCESS;
  readonly payload: Event;
};
export type WSConnectionErrorAction = {
  readonly type: typeof WS_CONNECTION_ERROR;
  readonly payload: Event;
};
export type WSConnectionClosedAction = {
  readonly type: typeof WS_CONNECTION_CLOSED;
};
export type WSGetMessageAction = {
  readonly type: typeof WS_GET_MESSAGE;
  readonly data: Readonly<TWSGetMessage>;
};
type WSDisconnecting = {
  readonly type: typeof WS_DISCONNECTING;
};

export type WsActions =
  | WSConnectionStartAction
  | WSConnectionSuccessAction
  | WSConnectionErrorAction
  | WSConnectionClosedAction
  | WSGetMessageAction
  | WSDisconnecting;

export const wsConnectionStart = (url: string): WSConnectionStartAction => {
  return {
    type: WS_CONNECTION_START,
    url,
  };
};

export const wsConnectionSuccess = (event: Event): WSConnectionSuccessAction => {
  return { type: WS_CONNECTION_SUCCESS, payload: event };
};

export const wsConnectionError = (event: Event): WSConnectionErrorAction => {
  return { type: WS_CONNECTION_ERROR, payload: event };
};

export const wsConnectionClosed = (): WSConnectionClosedAction => {
  return { type: WS_CONNECTION_CLOSED };
};

export const wsGetMessage = (data: Readonly<TWSGetMessage>): WSGetMessageAction => {
  return { type: WS_GET_MESSAGE, data };
};

export const wsDisconnecting = (): WSDisconnecting => {
  return { type: WS_DISCONNECTING };
};
