import { INGREDIENT_MODAL_CLOSE, INGREDIENT_MODAL_OPEN } from "../../constants/ingredientModal";
import { ingredientModalReducer } from "./ingredientModal";

describe("ingredient-modal reducer", () => {
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
    expect(ingredientModalReducer(undefined, {})).toEqual({
      ingredient: null,
    });
  });

  it("should handle INGREDIENT_MODAL_OPEN", () => {
    expect(
      ingredientModalReducer(
        {
          ingredient: null,
        },
        {
          type: INGREDIENT_MODAL_OPEN,
          ingredient,
        },
      ),
    ).toEqual({
      ingredient,
    });
  });

  it("should handle INGREDIENT_MODAL_CLOSE", () => {
    expect(
      ingredientModalReducer(
        {
          ingredient,
        },
        {
          type: INGREDIENT_MODAL_CLOSE,
        },
      ),
    ).toEqual({
      ingredient: null,
    });
  });
});
