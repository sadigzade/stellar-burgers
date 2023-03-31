import React from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useLocation } from "react-router-dom";
import IngredientView from "./IngredientView/IngredientView";

const IngredientsView = [
  { image: "https://code.s3.yandex.net/react/code/bun-02-mobile.png" },
  { image: "https://code.s3.yandex.net/react/code/bun-02-mobile.png" },
  { image: "https://code.s3.yandex.net/react/code/bun-02-mobile.png" },
  { image: "https://code.s3.yandex.net/react/code/bun-02-mobile.png" },
  { image: "https://code.s3.yandex.net/react/code/bun-02-mobile.png" },
  { image: "https://code.s3.yandex.net/react/code/bun-02-mobile.png" },
];

const OrderCard = () => {
  const { pathname } = useLocation();

  return (
    <Link to="034535" className="flex flex-col gap-y-6 p-6 rounded-[40px] bg-[#1C1C21]">
      <div className="flex justify-between">
        <span className="text text_type_digits-default">#034535</span>
        <span className="text text_type_main-default text_color_inactive">Сегодня, 16:20</span>
      </div>
      <div className="flex flex-col gap-y-2">
        <span className="text text_type_main-medium">Death Star Starship Main бургер</span>
        {pathname === "/profile/orders" && (
          <span className="text text_type_main-default">Готовится</span>
        )}
      </div>
      <div className="flex justify-between">
        <div className="flex items-center">
          {IngredientsView.map((item, index) => (
            <IngredientView key={index} item={item} index={index} />
          ))}
        </div>
        <div className="flex items-center gap-x-2">
          <span className="text text_type_digits-default">480</span>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </Link>
  );
};

export default OrderCard;
