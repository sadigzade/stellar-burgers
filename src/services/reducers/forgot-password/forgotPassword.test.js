import {
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_REQUEST_ERROR,
  FORGOT_PASSWORD_REQUEST_SUCCESS,
  FORGOT_PASSWORD_RESET,
} from "../../constants/forgotPassword";
import { forgotPasswordReducer } from "./forgotPassword";

describe("forgot-password reducer", () => {
  it("should return the initial state", () => {
    expect(forgotPasswordReducer(undefined, {})).toEqual({
      loading: false,
      error: null,
      success: false,
    });
  });

  it("should handle FORGOT_PASSWORD_REQUEST", () => {
    expect(
      forgotPasswordReducer(
        {
          loading: false,
          error: null,
          success: false,
        },
        {
          type: FORGOT_PASSWORD_REQUEST,
        },
      ),
    ).toEqual({
      loading: true,
      error: null,
      success: false,
    });
  });

  it("should handle FORGOT_PASSWORD_REQUEST_SUCCESS", () => {
    expect(
      forgotPasswordReducer(
        {
          loading: true,
          error: null,
          success: false,
        },
        {
          type: FORGOT_PASSWORD_REQUEST_SUCCESS,
          data: {
            success: true,
            message: "success_message",
          },
        },
      ),
    ).toEqual({
      loading: false,
      error: null,
      success: true,
    });
  });

  it("should handle FORGOT_PASSWORD_REQUEST_ERROR", () => {
    expect(
      forgotPasswordReducer(
        {
          loading: false,
          error: null,
          success: false,
        },
        {
          type: FORGOT_PASSWORD_REQUEST_ERROR,
          error: {
            success: false,
            message: "Fatal error",
          },
        },
      ),
    ).toEqual({
      loading: false,
      error: {
        success: false,
        message: "Fatal error",
      },
      success: false,
    });
  });

  it("should handle FORGOT_PASSWORD_RESET", () => {
    expect(
      forgotPasswordReducer(
        {
          loading: false,
          error: null,
          success: false,
        },
        {
          type: FORGOT_PASSWORD_RESET,
        },
      ),
    ).toEqual({
      loading: false,
      error: null,
      success: false,
    });
  });
});
