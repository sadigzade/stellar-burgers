import React from "react";
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import Modal from "../Modal/Modal";
import OrderDetails from "./OrderDetails/OrderDetails";
import ConstructorIngredients from "./ConstructorIngredients/ConstructorIngredients";
import { IngredientsContext } from "../../services/appContext";
import { postOrderNumber } from "../../utils/burger-api";

import styles from "./BurgerConstructor.module.css";

function BurgerConstructor() {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [orderNumber, setOrderNumber] = React.useState(null);
  const { products, totalPriceState, totalPriceDispatch } = React.useContext(IngredientsContext);

  const bun = React.useMemo(
    () => products.find((ingredient) => ingredient.type === "bun"),
    [products],
  );
  const ingredients = React.useMemo(
    () => products.filter((ingredient) => ingredient.type !== "bun"),
    [products],
  );

  const handleModalOpen = () => {
    setModalVisible(!modalVisible);
  };

  const handleClick = () => {
    const ingredientsId = [bun._id];

    ingredients.forEach((ingredient) => ingredientsId.push(ingredient._id));

    postOrderNumber(ingredientsId).then((res) => setOrderNumber(res.order.number));
  };

  React.useEffect(() => {
    totalPriceDispatch({ type: "calc", payload: { bun, ingredients } });
  }, [totalPriceState.totalPrice, totalPriceDispatch, bun, ingredients]);

  return (
    <section className={`${styles.BurgerConstructor} mt-15`}>
      <div className={`${styles.BurgerConstructorBlock} mr-4`}>
        <div className={styles.ConstructorBlock}>
          {bun && (
            <ConstructorElement
              type="top"
              isLocked={true}
              text={`${bun.name} (верх)`}
              price={bun.price}
              thumbnail={bun.image}
            />
          )}
        </div>

        <div className={styles.ConstructorIngredientsBlock}>
          {ingredients.map((item, index) => (
            <ConstructorIngredients
              key={`${item._id}_${index}`}
              name={item.name}
              price={item.price}
              thumbnail={item.image}
            />
          ))}
        </div>

        <div className={styles.ConstructorBlock}>
          {bun && (
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={`${bun.name} (низ)`}
              price={bun.price}
              thumbnail={bun.image}
            />
          )}
        </div>
      </div>
      <div className={`${styles.BurgerConstructorFooter} mr-4`}>
        <div className={styles.ConstructorPrice}>
          <span className="text text_type_digits-medium">{totalPriceState.totalPrice}</span>
          <CurrencyIcon type="primary" />
        </div>
        <div onClick={handleModalOpen}>
          <Button htmlType="button" type="primary" size="medium" onClick={handleClick}>
            Оформить заказ
          </Button>
        </div>
        {modalVisible && orderNumber && (
          <Modal onCloseClick={handleModalOpen}>
            <OrderDetails orderNumber={orderNumber} onCloseClick={handleModalOpen} />
          </Modal>
        )}
      </div>
    </section>
  );
}

export default BurgerConstructor;
