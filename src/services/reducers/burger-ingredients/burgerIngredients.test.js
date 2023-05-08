import {
  INGREDIENTS_COUNT_RESET,
  INGREDIENTS_MINUS_COUNT,
  INGREDIENTS_PLUS_COUNT,
  INGREDIENTS_REQUEST_ERROR,
  INGREDIENTS_REQUEST_SUCCESS,
} from "../../constants/burgerIngredients";
import { burgerIngredientsReducer } from "./burgerIngredients";

describe("burger-ingredients reducer", () => {
  const ingredient = {
    _id: "643d69a5c3f7b9001cfa093c",
    name: "Краторная булка N-200i",
    type: "bun",
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: "https://code.s3.yandex.net/react/code/bun-02.png",
    image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
    __v: 0,
  };

  it("should return the initial state", () => {
    expect(burgerIngredientsReducer(undefined, {})).toEqual({
      ingredients: [],
      error: null,
    });
  });

  it("should handle INGREDIENTS_REQUEST_SUCCESS", () => {
    expect(
      burgerIngredientsReducer(
        {
          ingredients: [],
          error: null,
        },
        {
          type: INGREDIENTS_REQUEST_SUCCESS,
          ingredients: [ingredient],
        },
      ),
    ).toEqual({
      ingredients: [{ ...ingredient, count: 0 }],
      error: null,
    });
  });

  it("should handle INGREDIENTS_REQUEST_ERROR", () => {
    const message = "Fatal error";

    expect(
      burgerIngredientsReducer(
        {
          ingredients: [],
          error: null,
        },
        {
          type: INGREDIENTS_REQUEST_ERROR,
          error: {
            success: false,
            message,
          },
        },
      ),
    ).toEqual({
      ingredients: [],
      error: {
        success: false,
        message,
      },
    });
  });

  it("should handle INGREDIENTS_COUNT_RESET", () => {
    expect(
      burgerIngredientsReducer(
        {
          ingredients: [{ ...ingredient, count: 3 }],
          error: null,
        },
        {
          type: INGREDIENTS_COUNT_RESET,
        },
      ),
    ).toEqual({
      ingredients: [{ ...ingredient, count: 0 }],
      error: null,
    });
  });

  it("should handle INGREDIENTS_PLUS_COUNT", () => {
    const ingredientId = "643d69a5c3f7b9001cfa093c";

    expect(
      burgerIngredientsReducer(
        {
          ingredients: [{ ...ingredient, count: 0 }],
          error: null,
        },
        {
          type: INGREDIENTS_PLUS_COUNT,
          ingredientId,
        },
      ),
    ).toEqual({
      ingredients: [{ ...ingredient, count: 1 }],
      error: null,
    });
  });

  it("should handle INGREDIENTS_MINUS_COUNT", () => {
    const ingredientId = "643d69a5c3f7b9001cfa093c";

    expect(
      burgerIngredientsReducer(
        {
          ingredients: [{ ...ingredient, count: 1 }],
          error: null,
        },
        {
          type: INGREDIENTS_MINUS_COUNT,
          ingredientId,
        },
      ),
    ).toEqual({
      ingredients: [{ ...ingredient, count: 0 }],
      error: null,
    });
  });
});
