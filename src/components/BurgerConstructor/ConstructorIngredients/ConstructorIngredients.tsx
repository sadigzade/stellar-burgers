import { FC } from "react";
import { Reorder } from "framer-motion";
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import type { TBurgerIngredients } from "../../../services/types/data";

type ConstructorIngredientsProps = {
  item: TBurgerIngredients;
  onRemoveHandler: (dragId: string, _id: string) => void;
};

const ConstructorIngredients: FC<ConstructorIngredientsProps> = ({ item, onRemoveHandler }) => {
  const { _id, dragId, name, price, image } = item;

  return (
    <Reorder.Item value={item}>
      <div className="flex items-center justify-end w-full gap-x-[7px]">
        <DragIcon type="primary" />
        <ConstructorElement
          text={name}
          price={price}
          thumbnail={image}
          handleClose={() => onRemoveHandler(dragId, _id)}
        />
      </div>
    </Reorder.Item>
  );
};

export default ConstructorIngredients;
