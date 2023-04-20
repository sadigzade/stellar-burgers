import { Link, useLocation, useParams } from "react-router-dom";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientImage from "./IngredientImage/IngredientImage";
import { FC } from "react";
import { TWSOrders, TWSOrdersStatus } from "../../../services/types/data";
import { getFormatDate } from "../../../utils/getFormatDate";
import { useSelector } from "../../../hooks/hooks";

type OrderCardProps = {
  order: TWSOrders;
};

const OrderCard: FC<OrderCardProps> = ({ order }) => {
  const { _id, number, name, ingredients, createdAt, status } = order;

  const { pathname } = useParams();
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
    <Link
      to={_id}
      className="flex flex-col gap-y-6 p-6 rounded-[40px] bg-[#1C1C21]"
      state={{ background: location }}>
      <div className="flex justify-between">
        <span className="text text_type_digits-default">#{number}</span>
        <span className="text text_type_main-default text_color_inactive">{formatedData}</span>
      </div>
      <div className="flex flex-col gap-y-2">
        <span className="text text_type_main-medium">{name}</span>
        {pathname === "/profile/orders" && status === TWSOrdersStatus.CREATED ? (
          <span className="text text_type_main-default">Создан</span>
        ) : status === TWSOrdersStatus.PENDING ? (
          <span className="text text_type_main-default">Готовится</span>
        ) : (
          <span className="text text_type_main-default text_color_success">Выполнен</span>
        )}
      </div>
      <div className="flex justify-between">
        <div className="flex items-center">
          {requiredIngredients.slice(0, 6).map((ingredient, index) => (
            <IngredientImage
              key={index}
              image={ingredient?.image}
              count={requiredIngredients.length - 5}
              index={index}
            />
          ))}
        </div>
        <div className="flex items-center gap-x-2">
          <span className="text text_type_digits-default">{totalPrice}</span>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </Link>
  );
};

export default OrderCard;
