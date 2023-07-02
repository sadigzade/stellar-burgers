import { forwardRef } from "react";
import Ingredient from "./Ingredient/Ingredient";
import { TBurgerIngredients } from "../../../services/types/data";

type IngredientCategoryProps = {
  text: string;
  products: TBurgerIngredients[];
};

const IngredientCategory = forwardRef<HTMLDivElement, IngredientCategoryProps>(
  ({ text, products }, ref) => {
    return (
      <div ref={ref}>
        <h2 className="mb-6">{text}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-2 gap-4 lg:gap-6 lg:pl-4">
          {products.map((ingredient, index) => (
            <Ingredient key={`${ingredient._id}_${index}`} ingredient={ingredient} />
          ))}
        </div>
      </div>
    );
  },
);

export default IngredientCategory;
