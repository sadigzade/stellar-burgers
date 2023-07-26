import React from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "../../hooks/hooks";

import OrderCard from "./OrderCard/OrderCard";

import styles from "./HistoryOrders.module.css";
import { getCookie } from "../../utils/cookie";
import { wsConnectionStart } from "../../services/actions/wsActions";
import { WS_API } from "../../utils/request";

const HistoryOrders = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  let orders = useSelector((state) => state.webSocket.orders);

  React.useEffect(() => {
    if (pathname === "/profile/orders") {
      const accessToken = getCookie("accessToken");
      dispatch(wsConnectionStart(`${WS_API}/orders?token=${accessToken}`));
    }

    if (pathname === "/feed") {
      dispatch(wsConnectionStart(`${WS_API}/orders/all`));
    }
  }, [dispatch]);

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
