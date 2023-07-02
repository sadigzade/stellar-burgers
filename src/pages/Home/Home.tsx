import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import BurgerIngredients from "../../components/BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../../components/BurgerConstructor/BurgerConstructor";

export const HomePage = () => {
  const [constructorVisible, setConstructorVisible] = useState(false);

  const handleConstructorVisible = () => {
    setConstructorVisible(!constructorVisible);

    if (constructorVisible) {
      document.body.style.overflow = "";
    } else {
      document.body.style.overflow = "hidden";
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="grid lg:grid-cols-2 lg:gap-10">
        <BurgerIngredients />
        <BurgerConstructor
          constructorVisible={constructorVisible}
          onConstructorVisible={handleConstructorVisible}
        />
      </div>
    </DndProvider>
  );
};
