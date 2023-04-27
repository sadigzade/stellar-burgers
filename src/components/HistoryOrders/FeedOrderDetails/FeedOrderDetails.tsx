import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import { useDispatch, useSelector } from "../../../hooks/hooks";
import { uniqIngredients } from "../../../utils/uniq-ingredients";
import { getFormatDate } from "../../../utils/getFormatDate";
import { getCookie } from "../../../utils/cookie";
import { WS_API } from "../../../utils/request";

import { wsConnectionStart } from "../../../services/actions/wsActions";
import { TWSOrdersStatus } from "../../../services/types/data";

import IngredientLine from "./IngredientLine/IngredientLine";

const FeedOrderDetails = () => {
  const { id } = useParams();
  const { pathname, state } = useLocation();
  const parsePathname =
    id && pathname.indexOf(id) !== -1 ? pathname.replace(`/${id}`, "") : pathname;

  const dispatch = useDispatch();
  const wsConnected = useSelector((state) => state.webSocket.wsConnected);
  const orders = useSelector((state) => state.webSocket.orders);
  const burgerIngredients = useSelector((state) => state.burgerIngredients.ingredients);
  const currentOrder = orders.find((order) => order._id === id);
  const ingredientsList =
    currentOrder &&
    burgerIngredients &&
    uniqIngredients(currentOrder.ingredients, burgerIngredients);
  const totalPrice =
    ingredientsList &&
    ingredientsList.reduce((sum, ingredient) => sum + ingredient.count * ingredient.price, 0);
  const formatedData = currentOrder && getFormatDate(currentOrder.createdAt);
  const orderStatus =
    currentOrder && currentOrder.status === TWSOrdersStatus.DONE ? "Выполнен" : "Готовится";

  useEffect(() => {
    if (!wsConnected) {
      if (parsePathname === "/profile/orders") {
        const accessToken = getCookie("accessToken");
        dispatch(wsConnectionStart(`${WS_API}/orders?token=${accessToken}`));
      }
      if (parsePathname === "/feed") {
        dispatch(wsConnectionStart(`${WS_API}/orders/all`));
      }
    }
  }, []);

  if (!currentOrder) {
    return null;
  }

  return (
    <section className="flex justify-center p-10">
      <div className="flex flex-col w-[640px]">
        <div className="flex flex-col mb-15">
          <div className={`flex items-center ${state ? "" : "justify-center"}`}>
            <span className="text text_type_digits-default mb-10">#{currentOrder.number}</span>
          </div>
          <h1 className="text text_type_main-medium mb-3">{currentOrder.name}</h1>
          <span className="text text_type_main-default text_color_success">{orderStatus}</span>
        </div>
        <span className="text text_type_main-medium mb-6">Состав:</span>
        <div
          className={`flex flex-col gap-y-4 max-h-[320px] overflow-y-scroll pr-8 mb-10 ${
            ingredientsList && ingredientsList.length > 4 ? "scrollbar" : ""
          }`}>
          {ingredientsList &&
            ingredientsList.map((ingredient) => (
              <IngredientLine
                key={ingredient._id}
                name={ingredient.name}
                price={ingredient.price}
                image={ingredient.image_mobile}
                count={ingredient.count}
              />
            ))}
        </div>
        <div className="flex justify-between items-center">
          <span className="text text_type_main-default text_color_inactive">{formatedData}</span>
          <div className="flex items-center gap-x-2">
            <span className="text text_type_digits-default">{totalPrice}</span>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeedOrderDetails;
