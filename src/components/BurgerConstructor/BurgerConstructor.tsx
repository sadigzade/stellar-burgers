import { useDrop } from "react-dnd";
import { Reorder } from "framer-motion";
import { useDispatch, useSelector } from "../../hooks/hooks";
import {
  CloseIcon,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import ConstructorIngredients from "./ConstructorIngredients/ConstructorIngredients";
import ConstructorElementEmpty from "./ConstructorElementEmpty/ConstructorElementEmpty";
import {
  constructorAddBun,
  constructorAddIngredient,
  constructorRemoveIngredient,
  constructorUpdate,
} from "../../services/actions/constructorIngredients";
import { DNDTypes } from "../../services/types/dnd-types";
import { TBurgerIngredients } from "../../services/types/data";
import {
  ingredientMinusCount,
  ingredientPlusCount,
} from "../../services/actions/burgerIngredients";
import ConstructorFooter from "./ConstructorFooter/ConstructorFooter";

const BurgerConstructor = () => {
  const dispatch = useDispatch();
  const bun = useSelector((state) => state.constructorIngredients.bun);
  const ingredients = useSelector((state) => state.constructorIngredients.ingredients);

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

  const handleRemoveIngredient = (dragId: string, ingredientId: string) => {
    dispatch(constructorRemoveIngredient(dragId));
    dispatch(ingredientMinusCount(ingredientId));
  };
  const handleUpdateConstructor = (newList: TBurgerIngredients[]) => {
    dispatch(constructorUpdate(newList));
  };

  const borderColorBun = isHoverBunBottom || isHoverBunTop ? "lightgreen" : "transparent";
  const borderColorIngredient = isHoverIngredient ? "lightgreen" : "transparent";

  return (
    <section className="fixed top-0 left-0 w-full h-full z-20 flex flex-col bg-[#131317]">
      <div className="flex items-center text-[28px] px-2 py-4">
        <h3 className="grow">Заказ</h3>
        <div className="cursor-pointer">
          <CloseIcon type="primary" />
        </div>
      </div>

      <div className="flex flex-col items-end gap-y-4 grow w-full pl-2">
        <div id={"drop-top"} ref={dropBunTopRef} className="w-full pr-2">
          {/* {bun ? (
            <div className="flex items-center space-x-2 mr-4">
              <div className="h-6 w-6" />
              <ConstructorElement
                type="top"
                isLocked={true}
                text={`${bun?.name} (верх)`}
                price={bun?.price}
                thumbnail={bun?.image}
                extraClass="truncate-text"
              />
            </div>
          ) : (
            <ConstructorElementEmpty
              position={"top"}
              borderColor={borderColorBun}
              text={"Выберите булку"}
            />
          )} */}

          <div className="flex items-center">
            <div className="h-4 w-4 svg-16">
              <DragIcon type="primary" />
            </div>
            <div className="flex gap-x-2">
              <img
                src="https://code.s3.yandex.net/react/code/bun-01-mobile.png"
                height={40}
                width={52}
                className="object-cover"
                alt=""
              />
              <span>Краторная булка N-200i (верх)</span>
              <span className="flex gap-x-2 font-iceland text-[22px] leading-6">
                20
                <CurrencyIcon type="primary" />
              </span>
            </div>
          </div>
        </div>

        <div id={"drop-center"} ref={dropIngredientRef} className="w-full">
          {/* {ingredients.length ? (
            <Reorder.Group
              axis="y"
              values={ingredients}
              onReorder={handleUpdateConstructor}
              className={`flex flex-col gap-y-4 max-h-[368px] overflow-y-auto ${
                ingredients.length > 4 ? "scrollbar" : "mr-2"
              }`}
            >
              {ingredients.map((ingredient) => {
                return (
                  <ConstructorIngredients
                    key={ingredient.dragId}
                    item={ingredient}
                    onRemoveHandler={handleRemoveIngredient}
                  />
                );
              })}
            </Reorder.Group>
          ) : (
            <ConstructorElementEmpty
              position="center"
              borderColor={borderColorIngredient}
              text="Выберите ингредиент"
            />
          )} */}

          <Reorder.Group
            axis="y"
            values={ingredients}
            onReorder={handleUpdateConstructor}
            className={`grid grid-cols-1 divide-y ${
              ingredients.length > 4 ? "scrollbar" : "lg:mr-2"
            }`}
          >
            {ingredients.map((ingredient) => {
              return (
                <ConstructorIngredients
                  key={ingredient.dragId}
                  item={ingredient}
                  onRemoveHandler={handleRemoveIngredient}
                />
              );
            })}
          </Reorder.Group>
        </div>

        <div id={"drop-bottom"} ref={dropBunBottomRef} className="w-full pr-2">
          {/* {bun ? (
            <div className="flex items-center space-x-2 mr-4">
              <div className="h-6 w-6" />
              <ConstructorElement
                type="bottom"
                isLocked={true}
                text={`${bun?.name} (низ)`}
                price={bun?.price}
                thumbnail={bun?.image}
                extraClass="truncate-text"
              />
            </div>
          ) : (
            <ConstructorElementEmpty
              position={"bottom"}
              borderColor={borderColorBun}
              text={"Выберите булку"}
            />
          )} */}

          <div className="flex items-center">
            <div className="h-4 w-4 svg-16">
              <DragIcon type="primary" />
            </div>
            <div className="flex gap-x-2">
              <img
                src="https://code.s3.yandex.net/react/code/bun-01-mobile.png"
                height={40}
                width={52}
                className="object-cover"
                alt=""
              />
              <span>Краторная булка N-200i (верх)</span>
              <span className="flex gap-x-2 font-iceland text-[22px] leading-6">
                20
                <CurrencyIcon type="primary" />
              </span>
            </div>
          </div>
        </div>
      </div>

      <ConstructorFooter />
    </section>
  );
};

export default BurgerConstructor;
