import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import BurgerIngredients from "../../components/BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../../components/BurgerConstructor/BurgerConstructor";

export const HomePage = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="grid lg:grid-cols-2 gap-10">
        <BurgerIngredients />
        <BurgerConstructor />
      </div>
    </DndProvider>
  );
};
