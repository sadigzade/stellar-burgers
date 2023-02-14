import React from "react";
import PropTypes from "prop-types";
import { CheckMarkIcon, CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./OrderDetails.module.css";

function OrderDetails({ onCloseClick }) {
  return (
    <>
      <div className={`${styles.OrderDetailsHeader} mt-15`}>
        <button className={styles.CloseIcon} onClick={onCloseClick}>
          <CloseIcon type="primary" />
        </button>
      </div>
      <div className={`${styles.OrderDetailsContent} mt-9 mb-30`}>
        <h2 className={`${styles.OrderNumber} text text_type_digits-large`}>034536</h2>
        <span className="text text_type_main-medium mt-8">идентификатор заказа</span>
        <div className={`${styles.OrderCheck} mt-15 mb-15`}>
          <CheckMarkIcon type="primary" />
        </div>
        <span className="text text_type_main-default mb-2">Ваш заказ начали готовить</span>
        <span className="text text_type_main-default text_color_inactive">
          Дождитесь готовности на орбитальной станции
        </span>
      </div>
    </>
  );
}

OrderDetails.propTypes = {
  onCloseClick: PropTypes.func.isRequired,
};

export default OrderDetails;
