import React from "react";
import HistoryOrders from "../../components/HistoryOrders/HistoryOrders";

export const FeedPage = () => {
  return (
    <section className="flex flex-col mt-10">
      <h1 className="text text_type_main-large">Лента заказов</h1>
      <div className="flex justify-between gap-x-[60px] mt-5">
        <HistoryOrders />
        <div className="flex flex-col w-full">
          <div className="flex gap-x-9">
            <div className="flex flex-col gap-y-6 w-full">
              <span className="text text_type_main-medium">Готовы:</span>
              <ul className="flex flex-col gap-y-2">
                <li className="text text_type_digits-default text_color_success">034533</li>
                <li className="text text_type_digits-default text_color_success">034532</li>
                <li className="text text_type_digits-default text_color_success">034530</li>
                <li className="text text_type_digits-default text_color_success">034527</li>
                <li className="text text_type_digits-default text_color_success">034525</li>
              </ul>
            </div>
            <div className="flex flex-col gap-y-6 w-full">
              <span className="text text_type_main-medium">В работе:</span>
              <ul className="flex flex-col gap-y-2">
                <li className="text text_type_digits-default">034533</li>
                <li className="text text_type_digits-default">034532</li>
                <li className="text text_type_digits-default">034530</li>
              </ul>
            </div>
          </div>
          <div className="mt-15">
            <span className="text text_type_main-medium">Выполнено за все время:</span>
            <h2 className="text text_type_digits-large text-shadow">28 752</h2>
          </div>
          <div className="mt-15">
            <span className="text text_type_main-medium">Выполнено за сегодня:</span>
            <h2 className="text text_type_digits-large text-shadow">138</h2>
          </div>
        </div>
      </div>
    </section>
  );
};
