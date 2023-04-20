import { FC } from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

type IngredientLineProps = {
  image: string;
  name: string;
  count: number;
  price: number;
};

const IngredientLine: FC<IngredientLineProps> = ({ image, name, count = 1, price }) => {
  return (
    <div className="flex items-center justify-between gap-x-4">
      <div className="relative h-[68px] w-[68px] overflow-hidden rounded-full bg-gradient flex justify-center items-center">
        <div className="h-16 w-16 rounded-full bg-[#1C1C21]">
          <img src={image} className="absolute h-14 top-1/2 left-1/2 transform-50" alt={name} />
        </div>
      </div>
      <span className="text text_type_main-default grow">{name}</span>
      <div className="flex items-center gap-x-2">
        <span className="text text_type_digits-default">
          {count} x {price}
        </span>
        <CurrencyIcon type="primary" />
      </div>
    </div>
  );
};

export default IngredientLine;
