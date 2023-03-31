import React from "react";
import { useDrop } from "react-dnd";
import { Reorder } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "../../hooks/hooks";
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../Modal/Modal";
import OrderDetailsModal from "./OrderDetailsModal/OrderDetailsModal";
import ConstructorIngredients from "./ConstructorIngredients/ConstructorIngredients";
import ConstructorElementEmpty from "./ConstructorElementEmpty/ConstructorElementEmpty";
import {
  constructorAddBun,
  constructorAddIngredient,
  constructorRemoveIngredient,
  constructorUpdate,
} from "../../services/actions/constructorIngredients";
import { orderNumberRequestAsync, orderNumberReset } from "../../services/actions/orderModal";
import { DNDTypes } from "../../services/dnd-types";
import { TBurgerIngredients } from "../../services/types/data";
import {
  ingredientMinusCount,
  ingredientPlusCount,
} from "../../services/actions/burgerIngredients";

const BurgerConstructor = () => {
  const dispatch = useDispatch();
  const bun = useSelector((state) => state.constructorIngredients.bun);
  const ingredients = useSelector((state) => state.constructorIngredients.ingredients);
  const order = useSelector((state) => state.orderModal.order);
  const user = useSelector((state) => state.profile.user);
  const navigate = useNavigate();

  const totalPrice = React.useMemo(() => {
    const bunPrice = bun?.price ? bun?.price : 0;
    const ingredientsPrice = ingredients.reduce((sum, ingredient) => sum + ingredient.price, 0);
    return 2 * bunPrice + ingredientsPrice;
  }, [bun?.price, ingredients]);

  const [{ isHoverBunTop }, dropBunTopRef] = useDrop({
    accept: DNDTypes.BUN,
    collect: (monitor) => ({
      isHoverBunTop: monitor.isOver(),
    }),
    drop: (item: TBurgerIngredients) => {
      dispatch(constructorAddBun(item));
    },
  });
  const [{ isHoverBunBottom }, dropBunBottomRef] = useDrop({
    accept: DNDTypes.BUN,
    collect: (monitor) => ({
      isHoverBunBottom: monitor.isOver(),
    }),
    drop: (item: TBurgerIngredients) => {
      dispatch(constructorAddBun(item));
    },
  });
  const [{ isHoverIngredient }, dropIngredientRef] = useDrop({
    accept: DNDTypes.INGREDIENT,
    collect: (monitor) => ({
      isHoverIngredient: monitor.isOver(),
    }),
    drop: (item: TBurgerIngredients) => {
      dispatch(constructorAddIngredient(item));
      dispatch(ingredientPlusCount(item._id));
    },
  });

  const handleClick = () => {
    if (user) {
      const ingredientsId = ingredients.reduce(
        (res, ingredient) => [...res, ingredient._id],
        [bun?._id],
      );
      ingredientsId.push(bun?._id);
      dispatch(orderNumberRequestAsync(ingredientsId));
    } else {
      navigate("/login");
    }
  };
  const handleModalClose = () => {
    dispatch(orderNumberReset());
  };
  const handleRemoveIngredient = (dragId: string, ingredientId: string) => {
    dispatch(constructorRemoveIngredient(dragId));
    dispatch(ingredientMinusCount(ingredientId));
  };
  const handleUpdateConstructor = (newList: TBurgerIngredients[]) => {
    dispatch(constructorUpdate(newList));
  };

  const borderColorBun = isHoverBunBottom || isHoverBunTop ? "lightgreen" : "transparent";
  const borderColorIngredient = isHoverIngredient ? "lightgreen" : "transparent";

  return (
    <section className="mt-25 w-full flex flex-col items-end gap-y-10">
      <div className={`flex flex-col gap-y-4 w-full mr-4`}>
        <div ref={dropBunTopRef} className="flex justify-end w-full">
          {bun ? (
            <ConstructorElement
              type="top"
              isLocked={true}
              text={`${bun?.name} (верх)`}
              price={bun?.price}
              thumbnail={bun?.image}
            />
          ) : (
            <ConstructorElementEmpty
              position={"top"}
              borderColor={borderColorBun}
              text={"Выберите булку"}
            />
          )}
        </div>

        <div ref={dropIngredientRef} className="flex flex-col items-end w-full">
          {ingredients.length ? (
            <Reorder.Group
              axis="y"
              values={ingredients}
              onReorder={handleUpdateConstructor}
              className={`flex flex-col gap-y-4 max-h-[368px] overflow-y-scroll pr-2 relative w-full
              ${ingredients.length > 4 ? "scrollbar -right-4" : "-right-2"}`}>
              {ingredients.map((ingredient) => {
                return (
                  <ConstructorIngredients
                    key={ingredient.dragId}
                    item={ingredient}
                    onRemoveHandler={handleRemoveIngredient}
                  />
                );
              })}
            </Reorder.Group>
          ) : (
            <ConstructorElementEmpty
              position="center"
              borderColor={borderColorIngredient}
              text="Выберите ингредиент"
            />
          )}
        </div>

        <div ref={dropBunBottomRef} className="flex justify-end w-full">
          {bun ? (
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={`${bun?.name} (низ)`}
              price={bun?.price}
              thumbnail={bun?.image}
            />
          ) : (
            <ConstructorElementEmpty
              position={"bottom"}
              borderColor={borderColorBun}
              text={"Выберите булку"}
            />
          )}
        </div>
      </div>
      <div className="flex gap-x-10 mr-4">
        <div className="flex items-center gap-x-5 svg-33">
          <span className="text text_type_digits-medium">{totalPrice}</span>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          htmlType="button"
          type="primary"
          disabled={!bun || !ingredients.length}
          size="medium"
          onClick={handleClick}>
          Оформить заказ
        </Button>
        {order?.number && (
          <Modal onClose={handleModalClose}>
            <OrderDetailsModal orderNumber={order?.number} />
          </Modal>
        )}
      </div>
    </section>
  );
};

export default BurgerConstructor;
