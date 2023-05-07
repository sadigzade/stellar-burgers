import { FC } from "react";
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag } from "react-dnd";
import { useDispatch, useSelector } from "../../../../hooks/hooks";
import { Link, useLocation } from "react-router-dom";
import { ingredientModalOpen } from "../../../../services/actions/ingredientModal";
import { DNDTypes } from "../../../../services/types/dnd-types";
import { TBurgerIngredients } from "../../../../services/types/data";

type IngredientProps = {
  ingredient: TBurgerIngredients;
};

const Ingredient: FC<IngredientProps> = ({ ingredient }) => {
  const { _id, image, name, price, type, count } = ingredient;
  const dispatch = useDispatch();
  const location = useLocation();
  const bunConstructor = useSelector((state) => state.constructorIngredients.bun);

  const [{ opacity }, dragRef] = useDrag({
    type: type === DNDTypes.BUN ? type : DNDTypes.INGREDIENT,
    item: ingredient,
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });

  const handleOpenModal = () => {
    dispatch(ingredientModalOpen(ingredient));
  };

  return (
    <Link
      key={_id}
      data-ingredient={"ingredient"}
      to={`/ingredients/${_id}`}
      state={{ background: location }}>
      <div
        className="flex flex-col items-center relative"
        style={{ opacity }}
        onClick={handleOpenModal}>
        <img ref={dragRef} src={image} alt={name} />
        <div className="flex items-center my-1">
          <span className="text text_type_digits-default mr-2">{price}</span>
          <CurrencyIcon type="primary" />
        </div>
        <p className="text-center">{name}</p>
        {type === "bun" && bunConstructor?._id === _id ? (
          <Counter count={2} size="default" extraClass="m-1" />
        ) : count ? (
          <Counter count={count} size="default" extraClass="m-1" />
        ) : null}
      </div>
    </Link>
  );
};

export default Ingredient;
