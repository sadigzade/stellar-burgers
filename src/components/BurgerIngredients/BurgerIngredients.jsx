import React from "react";
import { useDispatch, useSelector } from "react-redux";

import IngredientTab from "./IngredientTab/IngredientTab";
import IngredientCategory from "./IngredientCategory/IngredientCategory";

import styles from "./BurgerIngredients.module.css";
import { ingredientsRequestAsync } from "../../services/actions/burger-ingredients";

const INGREDIENTS_TYPES = [
  { type: "bun", text: "Булки" },
  { type: "sauce", text: "Соусы" },
  { type: "main", text: "Начинки" },
];

const BurgerIngredients = () => {
  const [ingredientType, setIngredientType] = React.useState("bun");
  const refBun = React.useRef(null);
  const refSauce = React.useRef(null);
  const refMain = React.useRef(null);

  const ingredients = useSelector((state) => state.burgerIngredients.ingredients);

  const buns = React.useMemo(
    () => ingredients.filter((item) => item.type === "bun"),
    [ingredients],
  );
  const sauces = React.useMemo(
    () => ingredients.filter((item) => item.type === "sauce"),
    [ingredients],
  );
  const mains = React.useMemo(
    () => ingredients.filter((item) => item.type === "main"),
    [ingredients],
  );

  const dispatch = useDispatch();

  const handleClick = (type) => {
    setIngredientType(type);

    switch (type) {
      case "bun": {
        refBun.current?.scrollIntoView({ behavior: "smooth" });
        break;
      }
      case "sauce": {
        refSauce.current?.scrollIntoView({ behavior: "smooth" });
        break;
      }
      case "main": {
        refMain.current?.scrollIntoView({ behavior: "smooth" });
        break;
      }
      default: {
        break;
      }
    }
  };

  const handleScroll = (e) => {
    const ingredeintsCoords = e.target?.getBoundingClientRect();
    const bunCoords = refBun.current?.getBoundingClientRect();
    const sauceCoords = refSauce.current?.getBoundingClientRect();
    const mainCoords = refMain.current?.getBoundingClientRect();

    if (ingredeintsCoords.top - bunCoords.top < 10) setIngredientType("bun");
    if (sauceCoords.top - ingredeintsCoords.top < 10) setIngredientType("sauce");
    if (
      mainCoords.top <
      ingredeintsCoords.top + (ingredeintsCoords.bottom - ingredeintsCoords.top) / 2
    )
      setIngredientType("main");
  };

  React.useEffect(() => {
    dispatch(ingredientsRequestAsync());
  }, [dispatch]);

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
            clickHandler={handleClick}
            type={tabInfo.type}
            text={tabInfo.text}
          />
        ))}
      </div>
      <div onScroll={handleScroll} className={`${styles.BurgerIngredientsContent} mb-10`}>
        <IngredientCategory ref={refBun} type={"bun"} text={"Булки"} products={buns} />
        <IngredientCategory ref={refSauce} type={"sauce"} text={"Соусы"} products={sauces} />
        <IngredientCategory ref={refMain} type={"main"} text={"Начинки"} products={mains} />
      </div>
    </section>
  );
};

export default BurgerIngredients;
