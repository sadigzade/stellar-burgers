import { FC } from "react";
import { Reorder } from "framer-motion";
import {
  CurrencyIcon,
  DeleteIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import type { TBurgerIngredients } from "../../../services/types/data";
import { useDispatch } from "../../../hooks/hooks";
import { constructorRemoveIngredient } from "../../../services/actions/constructorIngredients";
import { ingredientMinusCount } from "../../../services/actions/burgerIngredients";

type ConstructorIngredientsProps = {
  item: TBurgerIngredients;
};

const ConstructorIngredients: FC<ConstructorIngredientsProps> = ({ item }) => {
  const { _id, dragId, name, price, image_mobile } = item;
  const dispatch = useDispatch();

  const handleRemoveIngredient = (dragId: string, ingredientId: string) => {
    dispatch(constructorRemoveIngredient(dragId));
    dispatch(ingredientMinusCount(ingredientId));
  };

  return (
    <Reorder.Item value={item} className="flex items-center lg:gap-x-2">
      <div className="svg-16 lg:svg-24">
        <DragIcon type="primary" />
      </div>
      <div className="flex items-center w-full gap-x-2 lg:gap-x-5 lg:bg-[#1C1C21] lg:rounded-[40px] lg:grow py-4 pr-2 lg:pl-6 lg:pr-8 lg:py-4 lg:h-20">
        <img src={image_mobile} className="object-cover h-10 w-[52px] lg:w-auto" alt="" />
        <span className="grow">{name}</span>
        <span className="flex gap-x-2 font-iceland text-[22px] leading-6">
          {price}
          <CurrencyIcon type="primary" />
        </span>
        <div
          className="hidden lg:block h-6 w-6 cursor-pointer"
          onClick={() => handleRemoveIngredient(dragId, _id)}
        >
          <DeleteIcon type="primary" />
        </div>
      </div>
    </Reorder.Item>
  );
};

export default ConstructorIngredients;
