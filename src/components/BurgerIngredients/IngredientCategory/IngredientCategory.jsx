import React from "react";
import PropTypes from "prop-types";

import { dataPropTypes } from "../../../utils/prop-types";

import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./IngredientCategory.module.css";

function IngredientCategory({ text, data }) {
  return (
    <div className={`${styles.IngredientCategory} mb-10`}>
      <h2 className="text text_type_main-medium mb-6">{text}</h2>
      <div className={`${styles.Ingredients} mt-6 ml-4`}>
        {data.map((ingredient) => (
          <div key={ingredient._id} className={styles.Ingredient}>
            <img className={styles.IngredientImage} src={ingredient.image} alt={ingredient.name} />
            <div className={`${styles.IngredientPrice} mt-1 mb-1`}>
              <span className="text text_type_digits-default mr-2">{ingredient.price}</span>
              <CurrencyIcon type="primary" />
            </div>
            <p className={styles.IngredientTitle}>{ingredient.name}</p>
            {ingredient.__v ? <Counter count={1} size="default" extraClass="m-1" /> : null}
          </div>
        ))}
      </div>
    </div>
  );
}

IngredientCategory.propTypes = {
  text: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(dataPropTypes),
};

export default IngredientCategory;
