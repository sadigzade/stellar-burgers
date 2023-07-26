import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientImage from "./IngredientImage/IngredientImage";
import { TWSOrders, TWSOrdersStatus } from "../../../services/types/data";
import { getFormatDate } from "../../../utils/getFormatDate";
import { useSelector } from "../../../hooks/hooks";
import styles from "./OrderCard.module.css";

interface OrderCardProps {
  order: TWSOrders;
}

const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  const { _id, number, name, ingredients, createdAt, status } = order;

  const location = useLocation();
  const burgerIngredients = useSelector((state) => state.burgerIngredients.ingredients);

  const formatedData = getFormatDate(createdAt);
  const requiredIngredients = ingredients.map((id) =>
    burgerIngredients.find((ingredient) => ingredient._id === id),
  );
  const totalPrice = requiredIngredients.reduce((total, ingredient) => {
    if (ingredient) {
      return total + ingredient.price;
    }
    return total;
  }, 0);

  return (
    <Link to={_id} className={styles.ordercard} state={{ background: location }}>
      <div className={styles.ordercard__header}>
        <span className={styles["ordercard__header-number"]}>#{number}</span>
        <span className={styles["ordercard__header-time"]}>{formatedData}</span>
      </div>
      <div className={styles.ordercard__title}>
        <span>{name}</span>
      </div>
      {location.pathname === "/profile/orders" && (
        <div className={styles.ordercard__status}>
          {status === TWSOrdersStatus.CREATED ? (
            <span>Создан</span>
          ) : status === TWSOrdersStatus.PENDING ? (
            <span>Готовится</span>
          ) : status === TWSOrdersStatus.DONE ? (
            <span className={styles["status-success"]}>Выполнен</span>
          ) : (
            <></>
          )}
        </div>
      )}
      <div className={styles.ordercard__body}>
        <div className={styles["ordercard__body-ingredients"]}>
          {requiredIngredients.slice(0, 6).map((ingredient, index) => (
            <IngredientImage
              key={index}
              image={ingredient?.image}
              count={requiredIngredients.length - 5}
              index={index}
            />
          ))}
        </div>
        <div className={styles["ordercard__body-price"]}>
          <span>{totalPrice}</span>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </Link>
  );
};

export default OrderCard;
