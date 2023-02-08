import React from "react";
import PropTypes from "prop-types";

import IngredientsTab from "./IngredientsTab/IngredientsTab";
import IngredientsBlock from "./IngredientsBlock/IngredientsBlock";

import styles from "./BurgerIngredients.module.css";

const dataPropTypes = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  __v: PropTypes.number.isRequired,
});

const ingredientsPropTypes = PropTypes.shape({
  value: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(dataPropTypes),
});

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
          {this.props.ingredients.map((tabInfo, index) => (
            <IngredientsTab
              key={index}
              currentTab={this.state.current}
              onClick={this.setCurrent}
              {...tabInfo}
            />
          ))}
        </div>
        <div className={`${styles.BurgerIngredientsContent} mb-10`}>
          {this.props.ingredients.map((ingredient, index) => (
            <IngredientsBlock key={index} {...ingredient} />
          ))}
        </div>
      </section>
    );
  }
}

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientsPropTypes),
};

export default BurgerIngredients;
