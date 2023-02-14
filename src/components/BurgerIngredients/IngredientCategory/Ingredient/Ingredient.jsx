import React from "react";
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import Modal from "../../../Modal/Modal";
import IngredientDetails from "./IngredientDetails/IngredientDetails";
import { dataPropTypes } from "../../../../utils/prop-types";

import styles from "./Ingredient.module.css";

function Ingredient({ ingredient }) {
  const [modalVisible, setModalVisible] = React.useState(false);

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <>
      <div key={ingredient._id} className={styles.Ingredient} onClick={handleOpenModal}>
        <img className={styles.IngredientImage} src={ingredient.image} alt={ingredient.name} />
        <div className={`${styles.IngredientPrice} mt-1 mb-1`}>
          <span className="text text_type_digits-default mr-2">{ingredient.price}</span>
          <CurrencyIcon type="primary" />
        </div>
        <p className={styles.IngredientTitle}>{ingredient.name}</p>
        {ingredient.__v ? <Counter count={1} size="default" extraClass="m-1" /> : null}
      </div>
      {modalVisible && (
        <>
          <Modal onCloseClick={handleCloseModal}>
            <IngredientDetails ingredient={ingredient} onCloseClick={handleCloseModal} />
          </Modal>
        </>
      )}
    </>
  );
}

Ingredient.propTypes = {
  ingredient: dataPropTypes.isRequired,
};

export default Ingredient;
