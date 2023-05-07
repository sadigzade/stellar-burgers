import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_SUCCESS,
  WS_DISCONNECTING,
  WS_GET_MESSAGE,
} from "../../constants/wsActionTypes";
import { wsReducer } from "./wsReducer";

describe("ws-reducer", () => {
  const data = {
    success: true,
    orders: [
      {
        ingredients: [
          "60d3463f7034a000269f45e7",
          "60d3463f7034a000269f45e9",
          "60d3463f7034a000269f45e8",
          "60d3463f7034a000269f45ea",
        ],
        _id: "",
        status: "done",
        number: 0,
        createdAt: "2021-06-23T14:43:22.587Z",
        updatedAt: "2021-06-23T14:43:22.603Z",
      },
    ],
    total: 1,
    totalToday: 1,
  };

  it("should return the initial state", () => {
    expect(wsReducer(undefined, {})).toEqual({
      wsConnected: false,
      orders: [],
      total: 0,
      totalToday: 0,
    });
  });

  it("should handle WS_CONNECTION_SUCCESS", () => {
    expect(
      wsReducer(
        {
          wsConnected: false,
          orders: [],
          total: 0,
          totalToday: 0,
        },
        {
          type: WS_CONNECTION_SUCCESS,
        },
      ),
    ).toEqual({
      wsConnected: true,
      orders: [],
      total: 0,
      totalToday: 0,
      error: undefined,
    });
  });

  it("should handle WS_CONNECTION_ERROR", () => {
    expect(
      wsReducer(
        {
          wsConnected: false,
          orders: [],
          total: 0,
          totalToday: 0,
        },
        {
          type: WS_CONNECTION_ERROR,
        },
      ),
    ).toEqual({
      wsConnected: false,
      orders: [],
      total: 0,
      totalToday: 0,
    });
  });

  it("should handle WS_CONNECTION_CLOSED", () => {
    expect(
      wsReducer(
        {
          wsConnected: true,
          orders: data.orders,
          total: data.totalToday,
          totalToday: data.totalToday,
          error: undefined,
        },
        {
          type: WS_CONNECTION_CLOSED,
        },
      ),
    ).toEqual({
      wsConnected: false,
      orders: [],
      total: 0,
      totalToday: 0,
    });
  });

  it("should handle WS_GET_MESSAGE", () => {
    expect(
      wsReducer(
        {
          wsConnected: true,
          orders: [],
          total: 0,
          totalToday: 0,
          error: undefined,
        },
        {
          type: WS_GET_MESSAGE,
          data,
        },
      ),
    ).toEqual({
      wsConnected: true,
      orders: data.orders,
      total: data.totalToday,
      totalToday: data.totalToday,
      error: undefined,
    });
  });

  it("should handle WS_DISCONNECTING", () => {
    expect(
      wsReducer(
        {
          wsConnected: true,
          orders: data.orders,
          total: data.totalToday,
          totalToday: data.totalToday,
          error: undefined,
        },
        {
          type: WS_DISCONNECTING,
        },
      ),
    ).toEqual({
      wsConnected: false,
      orders: [],
      total: 0,
      totalToday: 0,
    });
  });
});
