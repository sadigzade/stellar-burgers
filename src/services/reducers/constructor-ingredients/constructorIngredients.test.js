import {
  CONSTRUCTOR_ADD_BUN,
  CONSTRUCTOR_ADD_INDGREDIENT,
  CONSTRUCTOR_REMOVE_INGREDIENT,
  CONSTRUCTOR_RESET,
  CONSTRUCTOR_UPDATE,
} from "../../constants/constructorIngredients";
import { constructorIngredientsReducer } from "./constructorIngredients";

describe("constructor-ingredients reducer", () => {
  const dragId = "431b7655-49dc-4ea7-8630-51b7f4a20d42";
  const ingredient = {
    _id: "643d69a5c3f7b9001cfa0943",
    name: "Соус фирменный Space Sauce",
    type: "sauce",
    proteins: 50,
    fat: 22,
    carbohydrates: 11,
    calories: 14,
    price: 80,
    image: "https://code.s3.yandex.net/react/code/sauce-04.png",
    image_mobile: "https://code.s3.yandex.net/react/code/sauce-04-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/sauce-04-large.png",
    __v: 0,
    count: 0,
  };

  it("should retrurn the initial state", () => {
    expect(constructorIngredientsReducer(undefined, {})).toEqual({
      bun: null,
      ingredients: [],
    });
  });

  it("should handle CONSTRUCTOR_ADD_BUN", () => {
    expect(
      constructorIngredientsReducer(
        {
          bun: null,
          ingredients: [],
        },
        {
          type: CONSTRUCTOR_ADD_BUN,
          item: ingredient,
        },
      ),
    ).toEqual({
      bun: { ...ingredient, count: 2 },
      ingredients: [],
    });
  });

  it("should handle CONSTRUCTOR_ADD_INDGREDIENT", () => {
    expect(
      constructorIngredientsReducer(
        {
          bun: null,
          ingredients: [],
        },
        {
          type: CONSTRUCTOR_ADD_INDGREDIENT,
          item: ingredient,
          dragId,
        },
      ),
    ).toEqual({
      bun: null,
      ingredients: [{ ...ingredient, dragId }],
    });
  });

  it("should handle CONSTRUCTOR_REMOVE_INGREDIENT", () => {
    expect(
      constructorIngredientsReducer(
        {
          bun: null,
          ingredients: [{ ...ingredient, dragId }],
        },
        {
          type: CONSTRUCTOR_REMOVE_INGREDIENT,
          dragId,
        },
      ),
    ).toEqual({
      bun: null,
      ingredients: [],
    });
  });

  // it("should handle CONSTRUCTOR_UPDATE", () => {
  //   const ingredients = [
  //     { ...ingredient, dragId },
  //     {
  //       _id: "643d69a5c3f7b9001cfa0945",
  //       name: "Соус с шипами Антарианского плоскоходца",
  //       type: "sauce",
  //       proteins: 101,
  //       fat: 99,
  //       carbohydrates: 100,
  //       calories: 100,
  //       price: 88,
  //       image: "https://code.s3.yandex.net/react/code/sauce-01.png",
  //       image_mobile: "https://code.s3.yandex.net/react/code/sauce-01-mobile.png",
  //       image_large: "https://code.s3.yandex.net/react/code/sauce-01-large.png",
  //       __v: 0,
  //       count: 0,
  //       dragId: "dd28b3fd-dc5a-4345-9e61-e21b95e31667",
  //     },
  //   ];
  //   expect(
  //     constructorIngredientsReducer(
  //       {
  //         bun: null,
  //         ingredients,
  //       },
  //       {
  //         type: CONSTRUCTOR_UPDATE,
  //       },
  //     ),
  //   ).toEqual({
  //     bun: null,
  //     ingredients: ingredients.reverse(),
  //   });
  // });

  it("should handle CONSTRUCTOR_RESET", () => {
    expect(
      constructorIngredientsReducer(
        {
          bun: null,
          ingredeints: [{ ...ingredient, dragId }],
        },
        {
          type: CONSTRUCTOR_RESET,
        },
      ),
    ).toEqual({
      bun: null,
      ingredients: [],
    });
  });
});
