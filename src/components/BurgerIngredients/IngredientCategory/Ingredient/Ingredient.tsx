import { FC, MouseEvent } from "react";
import { Button, Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag } from "react-dnd";
import { useDispatch, useSelector } from "../../../../hooks/hooks";
import { Link, useLocation, useNavigate, useNavigation } from "react-router-dom";
import { ingredientModalOpen } from "../../../../services/actions/ingredientModal";
import { DNDTypes } from "../../../../services/types/dnd-types";
import { TBurgerIngredients } from "../../../../services/types/data";
import {
  constructorAddBun,
  constructorAddIngredient,
} from "../../../../services/actions/constructorIngredients";
import { ingredientPlusCount } from "../../../../services/actions/burgerIngredients";

type IngredientProps = {
  ingredient: TBurgerIngredients;
};

const Ingredient: FC<IngredientProps> = ({ ingredient }) => {
  const { _id, image, image_mobile, name, price, type, count } = ingredient;
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const bunConstructor = useSelector((state) => state.constructorIngredients.bun);

  const [{ opacity }, dragRef] = useDrag({
    type: type === DNDTypes.BUN ? type : DNDTypes.INGREDIENT,
    item: ingredient,
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });

  const handleAddBun = () => {
    dispatch(constructorAddBun(ingredient));
  };

  const handleAddIngredient = () => {
    dispatch(constructorAddIngredient(ingredient));
    dispatch(ingredientPlusCount(ingredient._id));
  };

  const handleOpenModal = () => {
    navigate(`/ingredients/${_id}`, {
      state: {
        background: location,
      },
    });
    dispatch(ingredientModalOpen(ingredient));
    document.body.style.overflow = "hidden";
  };

  return (
    <div data-ingredient={"ingredient"}>
      <div
        ref={dragRef}
        className="flex flex-col items-center gap-y-2 lg:gap-1 relative"
        onClick={handleOpenModal}
        style={{ opacity }}
      >
        <img src={window.innerWidth < 768 ? image_mobile : image} alt={name} />
        <div className="flex items-center">
          <span className="text text_type_digits-default mr-2">{price}</span>
          <CurrencyIcon type="primary" />
        </div>
        <p className="text-center block h-[60px] lg:h-12 truncate-text">{name}</p>
        {type === "bun" && bunConstructor?._id === _id ? (
          <Counter
            count={2}
            size={window.innerWidth < 768 ? "small" : "default"}
            extraClass="m-1"
          />
        ) : count ? (
          <Counter
            count={count}
            size={window.innerWidth < 768 ? "small" : "default"}
            extraClass="m-1"
          />
        ) : null}
      </div>
      <Button
        htmlType="button"
        type="secondary"
        size="small"
        onClick={type === "bun" ? handleAddBun : handleAddIngredient}
        extraClass="w-full mt-2 lg:hidden"
      >
        Добавить
      </Button>
    </div>
  );
};

export default Ingredient;
