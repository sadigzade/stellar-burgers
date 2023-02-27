import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./IngredientDetails.module.css";

function IngredientDetails({ onCloseClick }) {
  const { name, image_large, calories, proteins, fat, carbohydrates } = useSelector(
    (state) => state.ingredientModal.ingredient,
  );

  return (
    <>
      <div className={`${styles.IngredientDetailsHeader} mt-10`}>
        <h2 className="text text_type_main-large">Детали ингредиента</h2>
        <button className={styles.CloseIcon} onClick={onCloseClick}>
          <CloseIcon type="primary" />
        </button>
      </div>
      <div className={`${styles.IngredientDetailsContent} mb-15`}>
        <img className="pl-5 pr-5" src={image_large} alt={name} />
        <h3 className="text text_type_main-medium mt-4">{name}</h3>
        <div className={`${styles.IngredientDetailsInfo} mt-8`}>
          <div className={styles.InfoItem}>
            <span className="text text_type_main-default text_color_inactive">Калории,ккал</span>
            <span className="text text_type_digits-default text_color_inactive mt-2">
              {calories}
            </span>
          </div>
          <div className={styles.InfoItem}>
            <span className="text text_type_main-default text_color_inactive">Белки, г</span>
            <span className="text text_type_digits-default text_color_inactive mt-2">
              {proteins}
            </span>
          </div>
          <div className={styles.InfoItem}>
            <span className="text text_type_main-default text_color_inactive">Жиры, г</span>
            <span className="text text_type_digits-default text_color_inactive mt-2">{fat}</span>
          </div>
          <div className={styles.InfoItem}>
            <span className="text text_type_main-default text_color_inactive">Углеводы, г</span>
            <span className="text text_type_digits-default text_color_inactive mt-2">
              {carbohydrates}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

IngredientDetails.propTypes = {
  onCloseClick: PropTypes.func.isRequired,
};

export default IngredientDetails;
