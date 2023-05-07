import {
  RESET_PASSWORD_INITIAL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_REQUEST_ERROR,
  RESET_PASSWORD_REQUEST_SUCCESS,
} from "../../constants/resetPassword";
import { resetPasswordReducer } from "./resetPassword";

describe("reset-password reducer", () => {
  const data = {
    success: true,
    message: "Password successfully reset",
  };
  const error = {
    success: false,
    error: "Fatal error",
  };

  it("should return the intial state", () => {
    expect(resetPasswordReducer(undefined, {})).toEqual({
      loading: false,
      error: null,
      success: false,
    });
  });

  it("should handle RESET_PASSWORD_REQUEST", () => {
    expect(
      resetPasswordReducer(
        {
          loading: false,
          error: null,
          success: false,
        },
        {
          type: RESET_PASSWORD_REQUEST,
        },
      ),
    ).toEqual({
      loading: true,
      error: null,
      success: false,
    });
  });

  it("should handle RESET_PASSWORD_REQUEST_SUCCESS", () => {
    expect(
      resetPasswordReducer(
        {
          loading: true,
          error: null,
          success: false,
        },
        {
          type: RESET_PASSWORD_REQUEST_SUCCESS,
          data,
        },
      ),
    ).toEqual({
      loading: false,
      error: null,
      success: data.success,
    });
  });

  it("should handle RESET_PASSWORD_REQUEST_ERROR", () => {
    expect(
      resetPasswordReducer(
        {
          loading: true,
          error: null,
          success: false,
        },
        {
          type: RESET_PASSWORD_REQUEST_ERROR,
          error,
        },
      ),
    ).toEqual({
      loading: false,
      error,
      success: false,
    });
  });

  it("should handle RESET_PASSWORD_INITIAL", () => {
    expect(
      resetPasswordReducer(
        {
          loading: false,
          error: null,
          success: data.success,
        },
        {
          type: RESET_PASSWORD_INITIAL,
        },
      ),
    ).toEqual({
      loading: false,
      error: null,
      success: false,
    });
  });
});
