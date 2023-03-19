import IngredientDetails from "../../components/BurgerIngredients/IngredientCategory/Ingredient/IngredientDetails/IngredientDetails";
import styles from "./Ingredient.module.css";

export const IngredientPage = () => {
  return (
    <div className={`${styles.IngredientPage} mt-30`}>
      <IngredientDetails />
    </div>
  );
};
