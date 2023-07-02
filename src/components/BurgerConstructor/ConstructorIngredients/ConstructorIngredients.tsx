import { FC } from "react";
import { Reorder } from "framer-motion";
import {
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import type { TBurgerIngredients } from "../../../services/types/data";

type ConstructorIngredientsProps = {
  item: TBurgerIngredients;
  onRemoveHandler: (dragId: string, _id: string) => void;
};

const ConstructorIngredients: FC<ConstructorIngredientsProps> = ({ item, onRemoveHandler }) => {
  const { _id, dragId, name, price, image_mobile } = item;

  return (
    <Reorder.Item value={item} className="flex items-center">
      <div className="h-4 w-4 svg-16">
        <DragIcon type="primary" />
      </div>
      <div className="flex w-full gap-x-2 py-4 pr-2">
        <img src={image_mobile} height={40} width={52} className="object-cover" alt="" />
        <span className="grow">{name}</span>
        <span className="flex gap-x-2 font-iceland text-[22px] leading-6">
          {price}
          <CurrencyIcon type="primary" />
        </span>
      </div>
    </Reorder.Item>
  );
};

export default ConstructorIngredients;
