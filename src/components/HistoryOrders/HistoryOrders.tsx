import { useLocation } from "react-router-dom";
import { useSelector } from "../../hooks/hooks";

import OrderCard from "./OrderCard/OrderCard";

import styles from "./HistoryOrders.module.css";

const HistoryOrders = () => {
  const { pathname } = useLocation();

  let orders = useSelector((state) => state.webSocket.orders);

  if (!orders) {
    return null;
  } else {
    if (pathname === "/profile/orders") {
      orders = [...orders].reverse();
    }
  }

  return (
    <div className={styles.historyorders}>
      {orders.map((order) => (
        <OrderCard key={order._id} order={order} />
      ))}
    </div>
  );
};

export default HistoryOrders;
