import React from "react";
import PropTypes from "prop-types";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

function IngredientTab({ value, text, currentTab, onClick }) {
  return (
    <Tab value={value} active={currentTab === value} onClick={onClick}>
      {text}
    </Tab>
  );
}

IngredientTab.propTypes = {
  value: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  currentTab: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default IngredientTab;
