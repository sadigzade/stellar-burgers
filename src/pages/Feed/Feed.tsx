import { useSelector } from "../../hooks/hooks";
import { getStatusOrders } from "../../utils/getStatusOrders";
import { TWSOrdersStatus } from "../../services/types/data";
import HistoryOrders from "../../components/HistoryOrders/HistoryOrders";

export const FeedPage = () => {
  const total = useSelector((state) => state.webSocket.total);
  const totalToday = useSelector((state) => state.webSocket.totalToday);
  const orders = useSelector((state) => state.webSocket.orders);
  const doneOrders = orders && getStatusOrders(orders, TWSOrdersStatus.DONE);
  const pendingOrders = orders && getStatusOrders(orders, TWSOrdersStatus.PENDING);

  return (
    <section className="flex flex-col mt-10">
      <h1 className="text text_type_main-large">Лента заказов</h1>
      <div className="flex justify-between gap-x-[60px] mt-5">
        <HistoryOrders />
        <div className="flex flex-col w-full">
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
        </div>
      </div>
    </section>
  );
};
