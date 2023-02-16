import React from "react";

import IngredientTab from "./IngredientTab/IngredientTab";
import IngredientCategory from "./IngredientCategory/IngredientCategory";
import { IngredientsContext } from "../../services/appContext";

import styles from "./BurgerIngredients.module.css";

const INGREDIENTS_TYPES = [
  { type: "bun", text: "Булки" },
  { type: "sauce", text: "Соусы" },
  { type: "main", text: "Начинки" },
];

const BurgerIngredients = () => {
  const [ingredientType, setIngredientType] = React.useState("bun");

  const { products } = React.useContext(IngredientsContext);

  const buns = React.useMemo(() => products.filter((item) => item.type === "bun"), [products]);
  const sauces = React.useMemo(() => products.filter((item) => item.type === "sauce"), [products]);
  const mains = React.useMemo(() => products.filter((item) => item.type === "main"), [products]);

  const handleClick = (type) => {
    setIngredientType(type);
  };

  return (
    <section className={styles.BurgerIngredients}>
      <h1 className={`${styles.BurgerIngredientsTitle} mb-5 text text_type_main-large`}>
        Соберите бургер
      </h1>
      <div className={`${styles.BurgerIngredientsTabs} mb-10`}>
        {INGREDIENTS_TYPES.map((tabInfo, index) => (
          <IngredientTab
            key={index}
            currentTab={ingredientType}
            onClick={handleClick}
            type={tabInfo.type}
            text={tabInfo.text}
          />
        ))}
      </div>
      <div className={`${styles.BurgerIngredientsContent} mb-10`}>
        <IngredientCategory text={"Булки"} products={buns} />
        <IngredientCategory text={"Соусы"} products={sauces} />
        <IngredientCategory text={"Начинки"} products={mains} />
      </div>
    </section>
  );
};

export default BurgerIngredients;
