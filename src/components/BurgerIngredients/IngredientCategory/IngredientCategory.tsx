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
      <div ref={ref} className="mb-10">
        <h2 className="text text_type_main-medium mb-6">{text}</h2>
        <div className="grid grid-cols-2 gap-6 mt-6 ml-4">
          {products.map((ingredient, index) => (
            <Ingredient key={`${ingredient._id}_${index}`} ingredient={ingredient} />
          ))}
        </div>
      </div>
    );
  },
);

export default IngredientCategory;
