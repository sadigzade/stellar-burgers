import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ingredientsRequestAsync } from "../../services/burgerIngredients/action";
import Skeleton from "./Skeleton/Skeleton";
import styles from "./Ingredient.module.css";

export const IngredientPage = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const ingredients = useSelector((state) => state.burgerIngredients.ingredients);
  const ingredient = React.useMemo(
    () => ingredients.find((item) => item._id === params.id),
    [ingredients, params.id],
  );

  React.useEffect(() => {
    dispatch(ingredientsRequestAsync());
  }, [dispatch]);

  return (
    <div className={`${styles.IngredientPage} mt-30`}>
      <h1 className="text text_type_main-large">Детали ингредиента</h1>
      {ingredient ? (
        <div className={`${styles.IngredientPageContent} mb-15`}>
          <img className="pl-5 pr-5" src={ingredient.image_large} alt={ingredient.name} />
          <h3 className="text text_type_main-medium mt-4">{ingredient.name}</h3>
          <div className={`${styles.IngredientPageInfo} mt-8`}>
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
      ) : (
        <Skeleton />
      )}
    </div>
  );
};
