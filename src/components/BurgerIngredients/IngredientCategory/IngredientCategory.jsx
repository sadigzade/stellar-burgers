import React from "react";
import PropTypes from "prop-types";

import { dataPropTypes } from "../../../utils/prop-types";

import styles from "./IngredientCategory.module.css";
import Ingredient from "./Ingredient/Ingredient";

const IngredientCategory = React.forwardRef(({ text, products }, ref) => {
  return (
    <div ref={ref} className={`${styles.IngredientCategory} mb-10`}>
      <h2 className="text text_type_main-medium mb-6">{text}</h2>
      <div className={`${styles.Ingredients} mt-6 ml-4`}>
        {products.map((ingredient, index) => (
          <Ingredient key={`${ingredient._id}_${index}`} ingredient={ingredient} />
        ))}
      </div>
    </div>
  );
});

IngredientCategory.propTypes = {
  text: PropTypes.string.isRequired,
  products: PropTypes.arrayOf(dataPropTypes.isRequired).isRequired,
};

export default IngredientCategory;
