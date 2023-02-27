import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDrop } from "react-dnd";
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
} from "../../services/actions/burger-constructor";

import styles from "./BurgerConstructor.module.css";
import { orderNumberRequestAsync, orderNumberReset } from "../../services/actions/order-modal";

const BurgerConstructor = () => {
  const dispatch = useDispatch();

  const { bun, ingredients, totalPrice, modalVisible } = useSelector((state) => ({
    bun: state.constructorIngredients.bun,
    ingredients: state.constructorIngredients.ingredients,
    totalPrice: state.constructorIngredients.totalPrice,
    modalVisible: state.orderModal.modalVisible,
    number: state.orderModal.number,
  }));

  const [{ isHoverBunTop }, dropBunTopRef] = useDrop({
    accept: "bun",
    collect: (monitor) => ({
      isHoverBunTop: monitor.isOver(),
    }),
    drop(item) {
      dispatch(constructorAddBun(item));
    },
  });

  const [{ isHoverBunBottom }, dropBunBottomRef] = useDrop({
    accept: "bun",
    collect: (monitor) => ({
      isHoverBunBottom: monitor.isOver(),
    }),
    drop(item) {
      dispatch(constructorAddBun(item));
    },
  });

  const [{ isHoverIngredient }, dropIngredientRef] = useDrop({
    accept: "ingredient",
    collect: (monitor) => ({
      isHoverIngredient: monitor.isOver(),
    }),
    drop(item) {
      dispatch(constructorAddIngredient(item));
    },
  });

  const moveCard = React.useCallback(
    (dragIndex, hoverIndex) => {
      const dragCard = ingredients[dragIndex];
      const newCards = [...ingredients];
      newCards.splice(dragIndex, 1);
      newCards.splice(hoverIndex, 0, dragCard);

      dispatch(constructorUpdate(newCards));
    },
    [ingredients, dispatch],
  );

  const borderColorBun = isHoverBunBottom || isHoverBunTop ? "lightgreen" : "transparent";
  const borderColorIngredient = isHoverIngredient ? "lightgreen" : "transparent";

  const handleClick = () => {
    const ingredientsId = [bun._id];
    ingredients.forEach((ingredient) => ingredientsId.push(ingredient._id));
    dispatch(orderNumberRequestAsync(ingredientsId));
  };

  const handleResetModal = () => {
    dispatch(orderNumberReset());
  };

  const handleRemoveIngredient = (dragId, ingredientId) => {
    dispatch(constructorRemoveIngredient(dragId, ingredientId));
  };

  return (
    <section className={`${styles.BurgerConstructor} mt-15`}>
      <div className={`${styles.BurgerConstructorBlock} mr-4`}>
        <div ref={dropBunTopRef} className={styles.ConstructorBlock}>
          {Object.keys(bun).length ? (
            <ConstructorElement
              type="top"
              isLocked={true}
              text={`${bun.name} (верх)`}
              price={bun.price}
              thumbnail={bun.image}
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
          {Object.keys(bun).length ? (
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={`${bun.name} (низ)`}
              price={bun.price}
              thumbnail={bun.image}
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
          <span className="text text_type_digits-medium">{String(totalPrice)}</span>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          htmlType="button"
          type="primary"
          disabled={!Object.keys(bun).length || !Object.keys(ingredients).length}
          size="medium"
          onClick={handleClick}>
          Оформить заказ
        </Button>
        {modalVisible && (
          <Modal onCloseClick={handleResetModal}>
            <OrderDetails onCloseClick={handleResetModal} />
          </Modal>
        )}
      </div>
    </section>
  );
};

export default BurgerConstructor;
