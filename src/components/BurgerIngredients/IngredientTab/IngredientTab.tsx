import { FC } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { TIngredient } from "../../../services/types/data";

type IngredientTabProps = {
  type: TIngredient;
  text: string;
  currentTab: TIngredient;
  clickHandler: (type: TIngredient) => void;
};

const IngredientTab: FC<IngredientTabProps> = ({ type, text, currentTab, clickHandler }) => {
  return (
    <Tab value={type} active={currentTab === type} onClick={() => clickHandler(type)}>
      {text}
    </Tab>
  );
};

export default IngredientTab;
