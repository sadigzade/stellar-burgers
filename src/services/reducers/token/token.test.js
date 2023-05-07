import { TOKEN_REQUEST_ERROR, TOKEN_REQUEST_SUCCESS } from "../../constants/token";
import { tokenReducer } from "./token";

describe("token reducer", () => {
  const data = {
    success: true,
    accessToken: "Bearer 321",
    refreshToken: "123",
  };
  const error = {
    success: false,
    message: "Fatal error",
  };

  it("should return the initial state", () => {
    expect(tokenReducer(undefined, {})).toEqual({
      error: null,
    });
  });

  it("should handle TOKEN_REQUEST_SUCCESS", () => {
    expect(
      tokenReducer(
        {
          error: null,
        },
        {
          type: TOKEN_REQUEST_SUCCESS,
          data,
        },
      ),
    ).toEqual({
      error: null,
    });
  });

  it("should handle TOKEN_REQUEST_ERROR", () => {
    expect(
      tokenReducer(
        {
          error: null,
        },
        {
          type: TOKEN_REQUEST_ERROR,
          error,
        },
      ),
    ).toEqual({
      error,
    });
  });
});
