import { forwardRef } from "react";
import Ingredient from "./Ingredient/Ingredient";
import { TBurgerIngredients } from "../../../services/types/data";
import styles from "./IngredientCategory.module.css";

interface IngredientCategoryProps {
  text: string;
  products: TBurgerIngredients[];
}

const IngredientCategory = forwardRef<HTMLDivElement, IngredientCategoryProps>(
  ({ text, products }, ref) => {
    return (
      <div ref={ref}>
        <h2 className={styles.ingredientcategory__title}>{text}</h2>
        <div className={styles.ingredientcategory__content}>
          {products.map((ingredient, index) => (
            <Ingredient key={`${ingredient._id}_${index}`} ingredient={ingredient} />
          ))}
        </div>
      </div>
    );
  },
);

export default IngredientCategory;
