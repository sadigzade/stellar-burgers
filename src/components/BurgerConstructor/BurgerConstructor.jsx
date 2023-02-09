import React from "react";
import PropTypes from "prop-types";
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import ConstructorIngredients from "./ConstructorIngredients/ConstructorIngredients";

import { dataPropTypes } from "../../utils/prop-types";

import styles from "./BurgerConstructor.module.css";

function BurgerConstructor({ bun, ingredients }) {
  return (
    <section className={`${styles.BurgerConstructor} mt-15`}>
      <div className={`${styles.BurgerConstructorBlock} mr-4`}>
        <div className={styles.ConstructorBlock}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${bun.name} (верх)`}
            price={bun.price}
            thumbnail={bun.thumbnail}
          />
        </div>

        <div className={styles.ConstructorIngredientsBlock}>
          {ingredients.map((item, index) => (
            <ConstructorIngredients
              key={`${item._id}_${index}`}
              name={item.name}
              price={item.price}
              thumbnail={item.thumbnail}
            />
          ))}
        </div>

        <div className={styles.ConstructorBlock}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${bun.name} (низ)`}
            price={bun.price}
            thumbnail={bun.thumbnail}
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
    </section>
  );
}

BurgerConstructor.propTypes = {
  bun: dataPropTypes.isRequired,
  ingredients: PropTypes.arrayOf(dataPropTypes.isRequired).isRequired,
};

export default BurgerConstructor;
