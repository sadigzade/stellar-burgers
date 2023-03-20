import React from "react";
import { useDrop } from "react-dnd";
import { Reorder } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../Modal/Modal";
import OrderDetails from "./OrderDetails/OrderDetails";
import ConstructorIngredients from "./ConstructorIngredients/ConstructorIngredients";
import ConstructorElementEmpty from "./ConstructorElementEmpty/ConstructorElementEmpty";
import {
  constructorAddBun,
  constructorAddIngredient,
  constructorRemoveIngredient,
  constructorUpdate,
} from "../../services/constructorIngredients/action";
import { orderNumberRequestAsync, orderNumberReset } from "../../services/orderModal/action";
import { DNDTypes } from "../../services/dnd-types";
import styles from "./BurgerConstructor.module.css";
import { TBurgerIngredients } from "../../services/types/types";

interface BurgerConstructorState {
  constructorIngredients: {
    bun: TBurgerIngredients;
    ingredients: TBurgerIngredients[];
  };
}

interface OrderModalState {
  orderModal: {
    order: {
      number: number;
    };
  };
}

interface ProfileState {
  profile: {
    user: {
      email: string;
      name: string;
    };
  };
}

const BurgerConstructor = () => {
  const dispatch = useDispatch();
  const bun = useSelector((state: BurgerConstructorState) => state.constructorIngredients.bun);
  const ingredients = useSelector(
    (state: BurgerConstructorState) => state.constructorIngredients.ingredients,
  );
  const order = useSelector((state: OrderModalState) => state.orderModal.order);
  const user = useSelector((state: ProfileState) => state.profile.user);
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
    drop(item) {
      dispatch(constructorAddBun(item));
    },
  });
  const [{ isHoverBunBottom }, dropBunBottomRef] = useDrop({
    accept: DNDTypes.BUN,
    collect: (monitor) => ({
      isHoverBunBottom: monitor.isOver(),
    }),
    drop(item) {
      dispatch(constructorAddBun(item));
    },
  });
  const [{ isHoverIngredient }, dropIngredientRef] = useDrop({
    accept: DNDTypes.INGREDIENT,
    collect: (monitor) => ({
      isHoverIngredient: monitor.isOver(),
    }),
    drop(item) {
      dispatch<any>(constructorAddIngredient(item));
    },
  });

  const handleClick = () => {
    if (user) {
      const ingredientsId = ingredients.reduce(
        (res, ingredient) => [...res, ingredient._id],
        [bun?._id],
      );
      dispatch<any>(orderNumberRequestAsync(ingredientsId));
    } else {
      navigate("/login");
    }
  };
  const handleModalClose = () => {
    dispatch(orderNumberReset());
  };
  const handleRemoveIngredient = (dragId: string, ingredientId: string) => {
    dispatch<any>(constructorRemoveIngredient(dragId, ingredientId));
  };
  const handleUpdateConstructor = (newList: TBurgerIngredients[]) => {
    dispatch(constructorUpdate(newList));
  };

  const borderColorBun = isHoverBunBottom || isHoverBunTop ? "lightgreen" : "transparent";
  const borderColorIngredient = isHoverIngredient ? "lightgreen" : "transparent";

  return (
    <section className={`${styles.BurgerConstructor} pt-25`}>
      <div className={`${styles.BurgerConstructorBlock} mr-4`}>
        <div ref={dropBunTopRef} className={styles.ConstructorBlock}>
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

        <div ref={dropIngredientRef} className={styles.ConstructorIngredientsBlock}>
          {ingredients.length ? (
            <Reorder.Group
              axis="y"
              values={ingredients}
              onReorder={handleUpdateConstructor}
              className={`${styles.IngredientsList} ${
                ingredients.length > 4 ? styles.scrollbar : ""
              }`}>
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

        <div ref={dropBunBottomRef} className={styles.ConstructorBlock}>
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
      <div className={`${styles.BurgerConstructorFooter} mr-4`}>
        <div className={styles.ConstructorPrice}>
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
            <OrderDetails orderNumber={order?.number} />
          </Modal>
        )}
      </div>
    </section>
  );
};

export default BurgerConstructor;
