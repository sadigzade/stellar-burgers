import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import styles from "./IngredientDetails.module.css";

function IngredientDetails() {
  const { id } = useParams();
  const ingredients = useSelector((state) => state.burgerIngredients.ingredients);
  const ingredient = React.useMemo(
    () => ingredients.find((item) => item._id === id),
    [id, ingredients],
  );

  if (!ingredient) {
    return null;
  }

  return (
    <div className={styles.IngredientDetails}>
      <div className={`${styles.IngredientDetailsHeader} mt-10`}>
        <h2 className="text text_type_main-large">Детали ингредиента</h2>
      </div>
      <div className={`${styles.IngredientDetailsContent} mb-15`}>
        <img className="pl-5 pr-5" src={ingredient.image_large} alt={ingredient.name} />
        <h3 className="text text_type_main-medium mt-4">{ingredient.name}</h3>
        <div className={`${styles.IngredientDetailsInfo} mt-8`}>
          <div className={styles.InfoItem}>
            <span className="text text_type_main-default text_color_inactive">Калории,ккал</span>
            <span className="text text_type_digits-default text_color_inactive mt-2">
              {ingredient.calories}
            </span>
          </div>
          <div className={styles.InfoItem}>
            <span className="text text_type_main-default text_color_inactive">Белки, г</span>
            <span className="text text_type_digits-default text_color_inactive mt-2">
              {ingredient.proteins}
            </span>
          </div>
          <div className={styles.InfoItem}>
            <span className="text text_type_main-default text_color_inactive">Жиры, г</span>
            <span className="text text_type_digits-default text_color_inactive mt-2">
              {ingredient.fat}
            </span>
          </div>
          <div className={styles.InfoItem}>
            <span className="text text_type_main-default text_color_inactive">Углеводы, г</span>
            <span className="text text_type_digits-default text_color_inactive mt-2">
              {ingredient.carbohydrates}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IngredientDetails;
