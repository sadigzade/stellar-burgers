import React from "react";
import PropTypes from "prop-types";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

function IngredientTab({ type, text, currentTab, clickHandler }) {
  return (
    <Tab value={type} active={currentTab === type} onClick={() => clickHandler(type)}>
      {text}
    </Tab>
  );
}

IngredientTab.propTypes = {
  type: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  currentTab: PropTypes.string.isRequired,
  clickHandler: PropTypes.func.isRequired,
};

export default IngredientTab;
