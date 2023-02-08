import React from "react";
import PropTypes from "prop-types";

import ConstructorIngredients from "./ConstructorIngredients/ConstructorIngredients";

import {
  Button,
  ConstructorElement,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./BurgerConstructor.module.css";

const constructorIngredients = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  thumbnail: PropTypes.string.isRequired,
});

function BurgerConstructor({ constructorIngredients }) {
  return (
    <section className={`${styles.BurgerConstructor} mt-15`}>
      <div className={`${styles.BurgerConstructorBlock} mr-4`}>
        <div className={styles.ConstructorBlock}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text="Краторная булка N-200i (верх)"
            price={200}
            thumbnail="https://code.s3.yandex.net/react/code/bun-02.png"
          />
        </div>

        <div className={styles.ConstructorIngredientsBlock}>
          {constructorIngredients.map((item, index) => (
            <ConstructorIngredients key={`${item._id}_${index}`} {...item} />
          ))}
        </div>

        <div className={styles.ConstructorBlock}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text="Краторная булка N-200i (низ)"
            price={200}
            thumbnail="https://code.s3.yandex.net/react/code/bun-02.png"
          />
        </div>
      </div>
      <div className={`${styles.BurgerConstructorFooter} mr-4`}>
        <div className={styles.ConstructorPrice}>
          <span className="text text_type_digits-medium">610</span>
          <CurrencyIcon type="primary" />
        </div>
        <Button htmlType="button" type="primary" size="medium">
          Оформить заказ
        </Button>
      </div>
      image.png{" "}
    </section>
  );
}

BurgerConstructor.propTypes = {
  constructorIngredients: PropTypes.arrayOf(constructorIngredients),
};

export default BurgerConstructor;
