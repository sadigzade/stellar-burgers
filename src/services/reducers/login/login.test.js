import {
  LOGIN_REQUEST,
  LOGIN_REQUEST_ERROR,
  LOGIN_REQUEST_SUCCESS,
  LOGIN_STATE_RESET,
  LOGOUT_REQUEST_ERROR,
} from "../../constants/login";
import { loginReducer } from "./login";

describe("login reducer", () => {
  const data = {
    success: true,
    accessToken: "Bearer 321",
    refreshToken: "123",
    user: {
      email: "sadigzade.hi@yandex.ru",
      name: "Khikmet Sadigzade",
    },
  };

  it("should return the initial state", () => {
    expect(loginReducer(undefined, {})).toEqual({
      loading: false,
      error: null,
      user: null,
    });
  });

  it("should handle LOGIN_REQUEST", () => {
    expect(
      loginReducer(
        {
          loading: false,
          error: null,
          user: null,
        },
        {
          type: LOGIN_REQUEST,
        },
      ),
    ).toEqual({
      loading: true,
      error: null,
      user: null,
    });
  });

  it("should handle LOGIN_REQUEST_SUCCESS", () => {
    expect(
      loginReducer(
        {
          loading: true,
          error: null,
          user: null,
        },
        {
          type: LOGIN_REQUEST_SUCCESS,
          data,
        },
      ),
    ).toEqual({
      loading: false,
      error: null,
      user: data.user,
    });
  });

  it("should handle LOGIN_REQUEST_ERROR", () => {
    const error = {
      success: false,
      error: "Fatal error",
    };

    expect(
      loginReducer(
        {
          loading: true,
          error: null,
          user: null,
        },
        {
          type: LOGIN_REQUEST_ERROR,
          error,
        },
      ),
    ).toEqual({
      loading: false,
      error,
      user: null,
    });
  });

  it("should handle LOGIN_STATE_RESET", () => {
    expect(
      loginReducer(
        {
          loading: false,
          error: null,
          user: data.user,
        },
        {
          type: LOGIN_STATE_RESET,
        },
      ),
    ).toEqual({
      loading: false,
      error: null,
      user: null,
    });
  });

  it("should handle LOGOUT_REQUEST_ERROR", () => {
    const error = {
      success: false,
      error: "Fatal error",
    };

    expect(
      loginReducer(
        {
          loading: false,
          error: null,
          user: data.user,
        },
        {
          type: LOGOUT_REQUEST_ERROR,
          error,
        },
      ),
    ).toEqual({
      loading: false,
      error,
      user: data.user,
    });
  });
});
