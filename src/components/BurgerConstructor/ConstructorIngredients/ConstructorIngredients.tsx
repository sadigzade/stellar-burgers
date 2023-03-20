import { FC } from "react";
import { Reorder } from "framer-motion";
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { TBurgerIngredients } from "../../../services/types/types";
import styles from "./ConstructorIngredients.module.css";

interface IConstructorIngredientsProps {
  item: TBurgerIngredients;
  onRemoveHandler: (dragId: string, _id: string) => void;
}

const ConstructorIngredients: FC<IConstructorIngredientsProps> = ({ item, onRemoveHandler }) => {
  const { _id, dragId, name, price, image } = item;

  return (
    <Reorder.Item value={item}>
      <div className={styles.ConstructorBlock}>
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
