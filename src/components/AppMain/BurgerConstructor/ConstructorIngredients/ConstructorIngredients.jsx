import React from "react";
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./ConstructorIngredients.module.css";

function ConstructorIngredients({ text, price, thumbnail }) {
  return (
    <div className={styles.ConstructorBlock}>
      <DragIcon type="primary" />
      <ConstructorElement text={text} price={price} thumbnail={thumbnail} />
    </div>
  );
}

export default ConstructorIngredients;
