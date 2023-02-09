import React from "react";

import IngredientTab from "./IngredientTab/IngredientTab";
import IngredientCategory from "./IngredientCategory/IngredientCategory";

import { buns, mains, sauces } from "../../utils/data";

import styles from "./BurgerIngredients.module.css";

const ingredients = [
  { value: "bun", text: "Булки", data: buns },
  { value: "sauce", text: "Соусы", data: sauces },
  { value: "main", text: "Начинки", data: mains },
];

class BurgerIngredients extends React.Component {
  state = {
    current: "bun",
  };

  setCurrent = (tabName) => {
    this.setState({
      current: tabName,
    });
  };

  render() {
    return (
      <section className={styles.BurgerIngredients}>
        <h1 className={`${styles.BurgerIngredientsTitle} mb-5 text text_type_main-large`}>
          Соберите бургер
        </h1>
        <div className={`${styles.BurgerIngredientsTabs} mb-10`}>
          {ingredients.map((tabInfo, index) => (
            <IngredientTab
              key={index}
              currentTab={this.state.current}
              onClick={this.setCurrent}
              value={tabInfo.value}
              text={tabInfo.text}
            />
          ))}
        </div>
        <div className={`${styles.BurgerIngredientsContent} mb-10`}>
          {ingredients.map((ingredient, index) => (
            <IngredientCategory key={index} text={ingredient.text} data={ingredient.data} />
          ))}
        </div>
      </section>
    );
  }
}

export default BurgerIngredients;
