import { MouseEvent, useMemo, useRef, useState } from "react";
import { useSelector } from "../../hooks/hooks";
import IngredientTab from "./IngredientTab/IngredientTab";
import IngredientCategory from "./IngredientCategory/IngredientCategory";
import type { TIngredient } from "../../services/types/data";

const BurgerIngredients = () => {
  const [ingredientType, setIngredientType] = useState<TIngredient>("bun");
  const refBun = useRef<HTMLDivElement>(null);
  const refSauce = useRef<HTMLDivElement>(null);
  const refMain = useRef<HTMLDivElement>(null);

  const ingredients = useSelector((state) => state.burgerIngredients.ingredients);

  const buns = useMemo(() => ingredients.filter((item) => item.type === "bun"), [ingredients]);
  const sauces = useMemo(() => ingredients.filter((item) => item.type === "sauce"), [ingredients]);
  const mains = useMemo(() => ingredients.filter((item) => item.type === "main"), [ingredients]);

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

  const handleScroll = (e: MouseEvent<HTMLDivElement>) => {
    const ingredeintsCoords = e.currentTarget.getBoundingClientRect();
    const bunCoords = refBun.current?.getBoundingClientRect();
    const sauceCoords = refSauce.current?.getBoundingClientRect();
    const mainCoords = refMain.current?.getBoundingClientRect();

    if (bunCoords && sauceCoords && mainCoords) {
      if (ingredeintsCoords.top - bunCoords.top < 10) setIngredientType("bun");
      if (sauceCoords.top - ingredeintsCoords.top < 10) setIngredientType("sauce");
      if (
        mainCoords.top <
        ingredeintsCoords.top + (ingredeintsCoords.bottom - ingredeintsCoords.top) / 2
      )
        setIngredientType("main");
    }
  };

  return (
    <section className="w-full mt-10">
      <h1 className="text text_type_main-large mb-5">Соберите бургер</h1>
      <div className="flex mb-10">
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
      <div onScroll={handleScroll} className="overflow-y-scroll scrollbar pr-2 h-auto-304 mb-5">
        <IngredientCategory ref={refBun} text={"Булки"} products={buns} />
        <IngredientCategory ref={refSauce} text={"Соусы"} products={sauces} />
        <IngredientCategory ref={refMain} text={"Начинки"} products={mains} />
      </div>
    </section>
  );
};

export default BurgerIngredients;