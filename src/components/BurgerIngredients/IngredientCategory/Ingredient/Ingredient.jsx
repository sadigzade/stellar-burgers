import React from "react";
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag } from "react-dnd";
import { useDispatch } from "react-redux";

import Modal from "../../../Modal/Modal";
import IngredientDetails from "./IngredientDetails/IngredientDetails";
import { dataPropTypes } from "../../../../utils/prop-types";
import {
  ingredientModalClose,
  ingredientModalOpen,
} from "../../../../services/actions/ingredient-modal";

import styles from "./Ingredient.module.css";

function Ingredient({ ingredient }) {
  const { _id, image, name, price, type, count } = ingredient;
  const [modalVisible, setModalVisible] = React.useState(false);
  const dispatch = useDispatch();

  const [{ opacity }, dragRef] = useDrag({
    type: type === "bun" ? type : "ingredient",
    item: { ...ingredient },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });

  const handleOpenModal = () => {
    dispatch(ingredientModalOpen(ingredient));
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    dispatch(ingredientModalClose());
    setModalVisible(false);
  };

  return (
    <>
      <div key={_id} className={styles.Ingredient} style={{ opacity }} onClick={handleOpenModal}>
        <img ref={dragRef} className={styles.IngredientImage} src={image} alt={name} />
        <div className={`${styles.IngredientPrice} mt-1 mb-1`}>
          <span className="text text_type_digits-default mr-2">{price}</span>
          <CurrencyIcon type="primary" />
        </div>
        <p className={styles.IngredientTitle}>{name}</p>
        {count ? <Counter count={count} size="default" extraClass="m-1" /> : null}
      </div>
      {modalVisible && (
        <Modal onCloseClick={handleCloseModal}>
          <IngredientDetails onCloseClick={handleCloseModal} />
        </Modal>
      )}
    </>
  );
}

Ingredient.propTypes = {
  ingredient: dataPropTypes.isRequired,
};

export default Ingredient;
