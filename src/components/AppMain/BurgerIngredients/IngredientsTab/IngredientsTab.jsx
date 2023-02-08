import React from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

function IngredientsTab({ value, text, currentTab, onClick }) {
  return (
    <Tab value={value} active={currentTab === value} onClick={onClick}>
      {text}
    </Tab>
  );
}

export default IngredientsTab;
