import { useDrop } from "react-dnd";
import { Reorder } from "framer-motion";
import { useDispatch, useSelector } from "../../hooks/hooks";
import {
  CloseIcon,
  CurrencyIcon,
  DragIcon,
  LockIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import ConstructorIngredients from "./ConstructorIngredients/ConstructorIngredients";
import ConstructorElementEmpty from "./ConstructorElementEmpty/ConstructorElementEmpty";
import {
  constructorAddBun,
  constructorAddIngredient,
  constructorUpdate,
} from "../../services/actions/constructorIngredients";
import { DNDTypes } from "../../services/types/dnd-types";
import { TBurgerIngredients } from "../../services/types/data";
import { ingredientPlusCount } from "../../services/actions/burgerIngredients";
import ConstructorFooter from "./ConstructorFooter/ConstructorFooter";
import { useState } from "react";

const BurgerConstructor = () => {
  const dispatch = useDispatch();
  const bun = useSelector((state) => state.constructorIngredients.bun);
  const ingredients = useSelector((state) => state.constructorIngredients.ingredients);
  const [constructorVisible, setConstructorVisible] = useState(false);

  const [{ isHoverBunTop }, dropBunTopRef] = useDrop({
    accept: DNDTypes.BUN,
    collect: (monitor) => ({
      isHoverBunTop: monitor.isOver(),
    }),
    drop: (item: TBurgerIngredients) => {
      dispatch(constructorAddBun(item));
    },
  });
  const [{ isHoverBunBottom }, dropBunBottomRef] = useDrop({
    accept: DNDTypes.BUN,
    collect: (monitor) => ({
      isHoverBunBottom: monitor.isOver(),
    }),
    drop: (item: TBurgerIngredients) => {
      dispatch(constructorAddBun(item));
    },
  });
  const [{ isHoverIngredient }, dropIngredientRef] = useDrop({
    accept: DNDTypes.INGREDIENT,
    collect: (monitor) => ({
      isHoverIngredient: monitor.isOver(),
    }),
    drop: (item: TBurgerIngredients) => {
      dispatch(constructorAddIngredient(item));
      dispatch(ingredientPlusCount(item._id));
    },
  });

  const handleUpdateConstructor = (newList: TBurgerIngredients[]) => {
    dispatch(constructorUpdate(newList));
  };
  const handleConstructorVisible = () => {
    setConstructorVisible(!constructorVisible);

    if (constructorVisible) {
      document.body.style.overflow = "";
    } else {
      document.body.style.overflow = "hidden";
    }
  };

  const borderColorBun = isHoverBunBottom || isHoverBunTop ? "lightgreen" : "transparent";
  const borderColorIngredient = isHoverIngredient ? "lightgreen" : "transparent";

  return (
    <section
      className={`${
        constructorVisible ? "fixed" : ""
      } lg:sticky top-0 lg:top-28 left-0 w-full h-full lg:h-auto z-20 lg:z-0 flex flex-col bg-[#131317] lg:bg-transparent lg:mt-[100px]`}
    >
      <div
        className={`${
          constructorVisible ? "flex" : "hidden"
        } lg:hidden items-center text-[28px] px-2 py-4`}
      >
        <h3 className="grow">Заказ</h3>
        <div className="cursor-pointer" onClick={handleConstructorVisible}>
          <CloseIcon type="primary" />
        </div>
      </div>

      <div
        className={`${
          constructorVisible ? "flex" : "hidden"
        } lg:flex flex-col items-end grow lg:grow-0 w-full pl-2 lg:pl-4 lg:gap-y-4`}
      >
        <div id={"drop-top"} ref={dropBunTopRef} className="w-full pr-2 lg:pr-0">
          {bun ? (
            <div className="flex items-center py-4 lg:py-0 lg:mr-4 lg:gap-x-2">
              <div className="svg-16 lg:hidden">
                <DragIcon type="primary" />
              </div>
              <div className="hidden lg:flex w-6 shrink-0" />
              <div className="flex gap-x-2 lg:gap-x-5 grow items-center lg:bg-[#1C1C21] lg:rounded-t-[88px] lg:rounded-b-[40px] lg:pl-6 lg:pr-8 lg:py-4 lg:h-20">
                <img src={bun?.image} className="object-cover h-10 w-[52px] lg:w-auto" alt="" />
                <span className="truncate-text leading-6 grow">{bun.name}</span>
                <span className="flex gap-x-2 font-iceland text-[22px] leading-6">
                  {bun.price}
                  <CurrencyIcon type="primary" />
                </span>
                <div className="hidden lg:block h-6 w-6">
                  <LockIcon type="secondary" />
                </div>
              </div>
            </div>
          ) : (
            <ConstructorElementEmpty
              position="top"
              borderColor={borderColorBun}
              text={"Выберите булку"}
            />
          )}
        </div>

        <div id={"drop-center"} ref={dropIngredientRef} className="w-full">
          {ingredients.length ? (
            <Reorder.Group
              axis="y"
              values={ingredients}
              onReorder={handleUpdateConstructor}
              className={`grid grid-cols-1 lg:gap-y-4 lg:max-h-[368px] lg:overflow-y-scroll ${
                ingredients.length > 4 ? "scrollbar lg:pr-2" : "lg:mr-4"
              }`}
            >
              {ingredients.map((ingredient) => (
                <ConstructorIngredients key={ingredient.dragId} item={ingredient} />
              ))}
            </Reorder.Group>
          ) : (
            <ConstructorElementEmpty
              position="center"
              borderColor={borderColorIngredient}
              text={"Выберите ингредиент"}
            />
          )}
        </div>

        <div id={"drop-bottom"} ref={dropBunBottomRef} className="w-full pr-2 lg:pr-0">
          {bun ? (
            <div className="flex items-center py-4 lg:py-0 lg:mr-4 lg:gap-x-2">
              <div className="svg-16 lg:hidden">
                <DragIcon type="primary" />
              </div>
              <div className="hidden lg:block w-6 shrink-0" />
              <div className="flex gap-x-2 lg:gap-x-5 grow items-center lg:bg-[#1C1C21] lg:rounded-b-[88px] lg:rounded-t-[40px] lg:pl-6 lg:pr-8 lg:py-4 lg:h-20">
                <img src={bun.image} className="object-cover h-10 w-[52px] lg:w-auto" alt="" />
                <span className="truncate-text leading-6 grow">{bun.name}</span>
                <span className="flex gap-x-2 font-iceland text-[22px] leading-6">
                  {bun.price}
                  <CurrencyIcon type="primary" />
                </span>
                <div className="hidden lg:block h-6 w-6">
                  <LockIcon type="secondary" />
                </div>
              </div>
            </div>
          ) : (
            <ConstructorElementEmpty
              position="bottom"
              borderColor={borderColorBun}
              text={"Выберите булку"}
            />
          )}
        </div>
      </div>

      <ConstructorFooter
        constructorVisible={constructorVisible}
        onConstructorVisible={handleConstructorVisible}
      />
    </section>
  );
};

export default BurgerConstructor;
