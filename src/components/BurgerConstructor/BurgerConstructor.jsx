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
import { calcTotalPrice } from "../../utils/calcTotalPrice";

import styles from "./BurgerConstructor.module.css";

const totalPriceInitialState = { totalPrice: 0 };

function reducer(state, action) {
  switch (action.type) {
    case "calc":
      return {
        totalPrice: action.totalPrice,
      };
    default:
      throw new Error(`Wrong type of action: ${action.type}`);
  }
}

function BurgerConstructor() {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [orderNumber, setOrderNumber] = React.useState(null);

  const { products } = React.useContext(IngredientsContext);

  const [totalPriceState, totalPriceDispatch] = React.useReducer(
    reducer,
    totalPriceInitialState,
    undefined,
  );

  const bun = React.useMemo(
    () => products.find((ingredient) => ingredient.type === "bun"),
    [products],
  );
  const ingredients = React.useMemo(
    () => products.filter((ingredient) => ingredient.type !== "bun"),
    [products],
  );

  const totalPrice = React.useMemo(() => calcTotalPrice(bun, ingredients), [bun, ingredients]);
  React.useMemo(() => totalPriceDispatch({ type: "calc", totalPrice }), [totalPrice]);

  const handleModalOpen = () => {
    setModalVisible(!modalVisible);
  };

  const handleClick = () => {
    const ingredientsId = [bun._id];
    ingredients.forEach((ingredient) => ingredientsId.push(ingredient._id));
    postOrderNumber(ingredientsId).then((res) => setOrderNumber(res.order.number));
  };

  React.useEffect(() => {
    if (orderNumber && !modalVisible) {
      setOrderNumber(null);
    }
  }, [orderNumber, modalVisible]);

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
