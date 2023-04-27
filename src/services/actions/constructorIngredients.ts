import { v4 as uuid } from "uuid";
import {
  CONSTRUCTOR_ADD_BUN,
  CONSTRUCTOR_ADD_INDGREDIENT,
  CONSTRUCTOR_REMOVE_INGREDIENT,
  CONSTRUCTOR_RESET,
  CONSTRUCTOR_UPDATE,
} from "../constants/constructorIngredients";
import type { TBurgerIngredients } from "../types/data";

type ConstructorAddBunAction = {
  readonly type: typeof CONSTRUCTOR_ADD_BUN;
  readonly item: TBurgerIngredients;
};
type ConstructorAddIngredientAction = {
  readonly type: typeof CONSTRUCTOR_ADD_INDGREDIENT;
  readonly item: TBurgerIngredients;
  readonly dragId: string;
};
type ConstructorRemoveIngredientAction = {
  readonly type: typeof CONSTRUCTOR_REMOVE_INGREDIENT;
  readonly dragId: string;
};
type ConstructorUpdateAction = {
  readonly type: typeof CONSTRUCTOR_UPDATE;
  readonly newList: TBurgerIngredients[];
};
type ConstructorResetAction = {
  readonly type: typeof CONSTRUCTOR_RESET;
};

export type ConstructorIngredientsActions =
  | ConstructorAddBunAction
  | ConstructorAddIngredientAction
  | ConstructorRemoveIngredientAction
  | ConstructorUpdateAction
  | ConstructorResetAction;

export const constructorAddBun = (item: TBurgerIngredients): ConstructorAddBunAction => {
  return {
    type: CONSTRUCTOR_ADD_BUN,
    item,
  };
};

export const constructorAddIngredient = (
  item: TBurgerIngredients,
): ConstructorAddIngredientAction => {
  return {
    type: CONSTRUCTOR_ADD_INDGREDIENT,
    item,
    dragId: uuid(),
  };
};

export const constructorRemoveIngredient = (dragId: string): ConstructorRemoveIngredientAction => {
  return {
    type: CONSTRUCTOR_REMOVE_INGREDIENT,
    dragId,
  };
};

export const constructorUpdate = (newList: TBurgerIngredients[]): ConstructorUpdateAction => {
  return {
    type: CONSTRUCTOR_UPDATE,
    newList,
  };
};

export const constructorReset = (): ConstructorResetAction => {
  return {
    type: CONSTRUCTOR_RESET,
  };
};
