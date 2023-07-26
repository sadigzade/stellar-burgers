import React from "react";
import { useSelector } from "../../hooks/hooks";
import IngredientTab from "./IngredientTab/IngredientTab";
import IngredientCategory from "./IngredientCategory/IngredientCategory";
import type { TIngredient } from "../../services/types/data";
import styles from "./BurgerIngredients.module.css";

const BurgerIngredients = () => {
  const [ingredientType, setIngredientType] = React.useState<TIngredient>("bun");
  const refBun = React.useRef<HTMLDivElement>(null);
  const refSauce = React.useRef<HTMLDivElement>(null);
  const refMain = React.useRef<HTMLDivElement>(null);

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

  const handleClick = (type: TIngredient) => {
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

  return (
    <section className={styles.burgeringredients}>
      <h1 className="text-center lg:text-start text-[28px] md:text-[32px] lg:text-4xl">
        Соберите бургер
      </h1>
      <div className={styles.burgeringredients__tabs}>
        <IngredientTab
          type={"bun"}
          text={"Булки"}
          currentTab={ingredientType}
          clickHandler={handleClick}
        />
        <IngredientTab
          type={"sauce"}
          text={"Соусы"}
          currentTab={ingredientType}
          clickHandler={handleClick}
        />
        <IngredientTab
          type={"main"}
          text={"Начинки"}
          currentTab={ingredientType}
          clickHandler={handleClick}
        />
      </div>
      <div className="flex flex-col gap-y-3 mt-5 lg:mt-10 mb-20 lg:mb-0 px-2 lg:px-0">
        <IngredientCategory ref={refBun} text={"Булки"} products={buns} />
        <IngredientCategory ref={refSauce} text={"Соусы"} products={sauces} />
        <IngredientCategory ref={refMain} text={"Начинки"} products={mains} />
      </div>
    </section>
  );
};

export default BurgerIngredients;
