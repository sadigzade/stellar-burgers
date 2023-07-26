import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import BurgerIngredients from "../../components/BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../../components/BurgerConstructor/BurgerConstructor";
import styles from "./Home.module.css";

export const HomePage = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className={styles.home}>
        <BurgerIngredients />
        <BurgerConstructor />
      </div>
    </DndProvider>
  );
};
