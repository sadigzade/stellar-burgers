import React from "react";
import { useDispatch, useSelector } from "../../hooks/hooks";
import { getStatusOrders } from "../../utils/getStatusOrders";
import { TWSOrdersStatus } from "../../services/types/data";
import HistoryOrders from "../../components/HistoryOrders/HistoryOrders";
import styles from "./Feed.module.css";
import Tab from "../../UI/Tab/Tab";
import { useLocation } from "react-router-dom";
import { getCookie } from "../../utils/cookie";
import { wsConnectionStart, wsDisconnecting } from "../../services/actions/wsActions";
import { WS_API } from "../../utils/request";
import classNames from "classnames";

export const FeedPage = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const total = useSelector((state) => state.webSocket.total);
  const totalToday = useSelector((state) => state.webSocket.totalToday);
  const orders = useSelector((state) => state.webSocket.orders);
  const doneOrders = orders && getStatusOrders(orders, TWSOrdersStatus.DONE);
  const pendingOrders = orders && getStatusOrders(orders, TWSOrdersStatus.PENDING);
  const [currentTab, setCurrentTab] = React.useState("orders");

  const resizeHanlder = () => {
    if (window.innerWidth >= 768) {
      setCurrentTab("all");
    } else {
      setCurrentTab("orders");
    }
  };

  React.useEffect(() => {
    if (pathname === "/profile/orders") {
      const accessToken = getCookie("accessToken");
      dispatch(wsConnectionStart(`${WS_API}/orders?token=${accessToken}`));
    }

    if (pathname === "/feed") {
      dispatch(wsConnectionStart(`${WS_API}/orders/all`));
    }

    return () => {
      dispatch(wsDisconnecting());
    };
  }, [dispatch]);

  React.useEffect(() => {
    window.addEventListener("resize", resizeHanlder);
    resizeHanlder();

    return () => {
      window.removeEventListener("resize", resizeHanlder);
    };
  }, []);

  return (
    <section className={styles.feed}>
      <h1 className={styles.feed__title}>Лента заказов</h1>
      <div className={styles.feed__content}>
        <div className={styles["feed__content-tabs"]}>
          <Tab type={"orders"} text={"Заказы"} currentTab={currentTab} onClick={setCurrentTab} />
          <Tab
            type={"statistics"}
            text={"Статистика"}
            currentTab={currentTab}
            onClick={setCurrentTab}
          />
        </div>
        {(currentTab === "orders" || currentTab === "all") && (
          <div className={styles.feed__orders}>
            <HistoryOrders />
          </div>
        )}
        {(currentTab === "statistics" || currentTab === "all") && (
          <div className={styles.feed__statistics}>
            <div className={styles["feed__statistics-readiness"]}>
              <div className={styles.readiness__block}>
                <span className={styles["readiness__block-title"]}>Готовы:</span>
                <div className={styles["readiness__block-list"]}>
                  <ul className={styles.list__readiness}>
                    {doneOrders.slice(0, 5).map((order) => (
                      <li
                        key={order.id}
                        className={classNames(styles.list__item, styles["item-success"])}
                      >
                        {order.number}
                      </li>
                    ))}
                  </ul>
                  <ul className={styles.list__readiness}>
                    {doneOrders.slice(5).map((order) => (
                      <li
                        key={order.id}
                        className={classNames(styles.list__item, styles["item-success"])}
                      >
                        {order.number}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className={styles.readiness__block}>
                <span className={styles["readiness__block-title"]}>В работе:</span>
                <div className={styles["readiness__block-list"]}>
                  <ul className={styles.list__readiness}>
                    {pendingOrders.slice(0, 5).map((order) => (
                      <li key={order.id} className={styles.list__item}>
                        {order.number}
                      </li>
                    ))}
                  </ul>
                  <ul className={styles.list__readiness}>
                    {pendingOrders.slice(5).map((order) => (
                      <li key={order.id} className={styles.list__item}>
                        {order.number}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className={styles["feed__statistics-total"]}>
              <span className={styles.total__title}>Выполнено за все время:</span>
              <h2 className={styles.total__value}>{total}</h2>
            </div>
            <div className={styles["feed__statistics-total"]}>
              <span className={styles.total__title}>Выполнено за сегодня:</span>
              <h2 className={styles.total__value}>{totalToday}</h2>
            </div>
          </div>
        )}
        {/* <HistoryOrders />
        <div className={styles.feed__statistics}>
          <div className="flex gap-x-9">
            <div className="flex flex-col gap-y-6 w-full">
              <span className="text text_type_main-medium">Готовы:</span>
              <div className="grid grid-cols-2">
                <ul className="flex flex-col gap-y-2">
                  {doneOrders.slice(0, 5).map((order) => (
                    <li key={order.id} className="text text_type_digits-default text_color_success">
                      {order.number}
                    </li>
                  ))}
                </ul>
                <ul className="flex flex-col gap-y-2">
                  {doneOrders.slice(5).map((order) => (
                    <li key={order.id} className="text text_type_digits-default text_color_success">
                      {order.number}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="flex flex-col gap-y-6 w-full">
              <span className="text text_type_main-medium">В работе:</span>
              <div className="grid grid-cols-2">
                <ul className="flex flex-col gap-y-2">
                  {pendingOrders.slice(0, 5).map((order) => (
                    <li key={order.id} className="text text_type_digits-default text_color_success">
                      {order.number}
                    </li>
                  ))}
                </ul>
                <ul className="flex flex-col gap-y-2">
                  {pendingOrders.slice(5).map((order) => (
                    <li key={order.id} className="text text_type_digits-default text_color_success">
                      {order.number}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-15">
            <span className="text text_type_main-medium">Выполнено за все время:</span>
            <h2 className="text text_type_digits-large text-shadow">{total}</h2>
          </div>
          <div className="mt-15">
            <span className="text text_type_main-medium">Выполнено за сегодня:</span>
            <h2 className="text text_type_digits-large text-shadow">{totalToday}</h2>
          </div>
        </div> */}
      </div>
    </section>
  );
};
