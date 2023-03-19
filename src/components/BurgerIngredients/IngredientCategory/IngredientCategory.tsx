import { forwardRef } from "react";
import Ingredient from "./Ingredient/Ingredient";
import styles from "./IngredientCategory.module.css";
import { TBurgerIngredients } from "../../../services/types/types";

interface IIngredientCategoryProps {
  text: string;
  products: TBurgerIngredients[];
}

const IngredientCategory = forwardRef<HTMLDivElement, IIngredientCategoryProps>(
  ({ text, products }, ref) => {
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
  },
);

export default IngredientCategory;
