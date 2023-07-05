import { useMemo } from "react";
import { useSelector } from "../../../../../hooks/hooks";
import { useLocation, useParams } from "react-router-dom";

const IngredientDetails = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const ingredients = useSelector((state) => state.burgerIngredients.ingredients);
  const ingredient = useMemo(() => ingredients.find((item) => item._id === id), [id, ingredients]);

  if (!ingredient) {
    return null;
  }

  return (
    <div className="flex flex-col items-center w-full px-[10px] lg:pt-10 lg:px-10 lg:pb-[60px]">
      <div
        className={`hidden lg:flex items-center h-[64px] w-full ${state ? "" : "justify-center"}`}
      >
        <h2 className="text text_type_main-large">Детали ингредиента</h2>
      </div>
      <div className="flex flex-col gap-y-4 items-center">
        <img
          className="w-[240px] lg:w-auto"
          src={window.innerWidth < 768 ? ingredient.image : ingredient.image_large}
          alt={ingredient.name}
        />
        <h3 className="text-[20px] lg:text-[24px] leading-6 lg:leading-[30px] text-center">
          {ingredient.name}
        </h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8 mt-8">
          <div className="flex flex-col items-center">
            <span className="text text_type_main-default text_color_inactive">Калории,ккал</span>
            <span className="text text_type_digits-default text_color_inactive mt-2">
              {ingredient.calories}
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text text_type_main-default text_color_inactive">Белки, г</span>
            <span className="text text_type_digits-default text_color_inactive mt-2">
              {ingredient.proteins}
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text text_type_main-default text_color_inactive">Жиры, г</span>
            <span className="text text_type_digits-default text_color_inactive mt-2">
              {ingredient.fat}
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text text_type_main-default text_color_inactive">Углеводы, г</span>
            <span className="text text_type_digits-default text_color_inactive mt-2">
              {ingredient.carbohydrates}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IngredientDetails;
