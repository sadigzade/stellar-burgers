import { FC } from "react";
import { TIngredient } from "../../../services/types/data";

type IngredientTabProps = {
  type: TIngredient;
  text: string;
  currentTab: TIngredient;
  clickHandler: (type: TIngredient) => void;
};

const IngredientTab: FC<IngredientTabProps> = ({ type, text, currentTab, clickHandler }) => {
  return (
    <div
      className={`relative w-full h-[52px] px-10 py-4 cursor-pointer duration-300 ease-in-out noselect ${
        type === currentTab ? "tab_type_current" : "tab-underline"
      }`}
      onClick={() => clickHandler(type)}
    >
      <span
        className={`absolute top-1/2 left-1/2 transform-50 text-sm md:text-base duration-300 ease-in-out ${
          type === currentTab ? "text-white" : "text_color_inactive"
        } hover:text-white`}
      >
        {text}
      </span>
    </div>
  );
};

export default IngredientTab;
