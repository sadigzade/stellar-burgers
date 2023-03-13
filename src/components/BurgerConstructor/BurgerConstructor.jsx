import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDrop } from "react-dnd";
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useNavigate } from "react-router-dom";
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
      dispatch(constructorAddIngredient(item));
    },
  });

  const moveCard = (dragIndex, hoverIndex) => {
    dispatch(constructorUpdate(dragIndex, hoverIndex));
  };

  const borderColorBun = isHoverBunBottom || isHoverBunTop ? "lightgreen" : "transparent";
  const borderColorIngredient = isHoverIngredient ? "lightgreen" : "transparent";

  const handleClick = () => {
    if (user) {
      const ingredientsId = ingredients.reduce(
        (res, ingredient) => [...res, ingredient._id],
        [bun?._id],
      );
      dispatch(orderNumberRequestAsync(ingredientsId));
    } else {
      navigate("/login");
    }
  };

  const handleModalClose = () => {
    dispatch(orderNumberReset());
  };

  const handleRemoveIngredient = (dragId, ingredientId) => {
    dispatch(constructorRemoveIngredient(dragId, ingredientId));
  };

  return (
    <section className={`${styles.BurgerConstructor} mt-25`}>
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

        <div
          ref={dropIngredientRef}
          className={`${styles.ConstructorIngredientsBlock} ${
            ingredients.length > 2 ? styles.scrollbar : ""
          }`}>
          {Object.keys(ingredients).length ? (
            ingredients.map((item, index) => (
              <ConstructorIngredients
                key={`${item._id}_${index}`}
                ingredient={item}
                index={index}
                onRemoveHandler={handleRemoveIngredient}
                moveCard={moveCard}
              />
            ))
          ) : (
            <ConstructorElementEmpty
              position={"center"}
              borderColor={borderColorIngredient}
              text={"Выберите начинку"}
            />
          )}
          {ingredients.length ? (
            <ConstructorElementEmpty
              position={"center"}
              borderColor={borderColorIngredient}
              text={"Добавить еще..."}
            />
          ) : null}
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
