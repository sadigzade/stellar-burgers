import {
  ORDER_NUMBER_REQUEST,
  ORDER_NUMBER_REQUEST_ERROR,
  ORDER_NUMBER_REQUEST_SUCCESS,
  ORDER_NUMBER_RESET,
} from "../../constants/orderModal";
import { orderModalReducer } from "./orderModal";

describe("order-modal reducer", () => {
  it("should return the initial state", () => {
    expect(orderModalReducer(undefined, {})).toEqual({
      status: false,
      order: null,
      error: null,
    });
  });

  it("should handle ORDER_NUMBER_REQUEST", () => {
    expect(
      orderModalReducer(
        {
          status: false,
          order: null,
          error: null,
        },
        {
          type: ORDER_NUMBER_REQUEST,
        },
      ),
    ).toEqual({
      status: true,
      order: null,
      error: null,
    });
  });

  it("should handle ORDER_NUMBER_REQUEST_SUCCESS", () => {
    const number = {
      number: 123456,
    };

    expect(
      orderModalReducer(
        {
          status: true,
          order: null,
          error: null,
        },
        {
          type: ORDER_NUMBER_REQUEST_SUCCESS,
          number,
        },
      ),
    ).toEqual({
      status: true,
      order: number,
      error: null,
    });
  });

  it("should handle ORDER_NUMBER_REQUEST_ERROR", () => {
    const error = {
      success: false,
      message: "Fatal error",
    };

    expect(
      orderModalReducer(
        {
          status: true,
          order: null,
          error: null,
        },
        {
          type: ORDER_NUMBER_REQUEST_ERROR,
          error,
        },
      ),
    ).toEqual({
      status: true,
      order: null,
      error,
    });
  });

  it("should handle ORDER_NUMBER_RESET", () => {
    const number = {
      number: 123456,
    };

    expect(
      orderModalReducer(
        {
          status: true,
          order: number,
          error: null,
        },
        {
          type: ORDER_NUMBER_RESET,
        },
      ),
    ).toEqual({
      status: false,
      order: null,
      error: null,
    });
  });
});
