import React from "react";
import PropTypes from "prop-types";

import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./ConstructorIngredients.module.css";

function ConstructorIngredients({ name, price, thumbnail }) {
  return (
    <div className={styles.ConstructorBlock}>
      <DragIcon type="primary" />
      <ConstructorElement text={name} price={price} thumbnail={thumbnail} />
    </div>
  );
}

ConstructorIngredients.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  thumbnail: PropTypes.string.isRequired,
};

export default ConstructorIngredients;
