import React from "react";
import PropTypes from "prop-types";
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import Modal from "../Modal/Modal";
import OrderDetails from "./OrderDetails/OrderDetails";
import ConstructorIngredients from "./ConstructorIngredients/ConstructorIngredients";
import { dataPropTypes } from "../../utils/prop-types";

import styles from "./BurgerConstructor.module.css";

function BurgerConstructor({ products }) {
  const [modalVisible, setModalVisible] = React.useState(false);

  const bun = React.useMemo(
    () => products.find((ingredient) => ingredient.type === "bun"),
    [products],
  );
  const ingredients = React.useMemo(
    () => products.filter((ingredient) => ingredient.type !== "bun"),
    [products],
  );

  const handleModalOpen = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

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
          <span className="text text_type_digits-medium">610</span>
          <CurrencyIcon type="primary" />
        </div>
        <div onClick={handleModalOpen}>
          <Button htmlType="button" type="primary" size="medium">
            Оформить заказ
          </Button>
        </div>
        {modalVisible && (
          <Modal onCloseClick={handleCloseModal}>
            <OrderDetails onCloseClick={handleCloseModal} />
          </Modal>
        )}
      </div>
    </section>
  );
}

BurgerConstructor.propTypes = {
  products: PropTypes.arrayOf(dataPropTypes.isRequired).isRequired,
};

export default BurgerConstructor;
