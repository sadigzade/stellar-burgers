import React from "react";

import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import { getIngredients } from "../../utils/burger-api";
import { IngredientsContext } from "../../services/appContext";

import styles from "./App.module.css";

const App = () => {
  const [products, setProducts] = React.useState([]);

  React.useEffect(() => {
    getIngredients().then((res) => setProducts(res));
  }, []);

  return (
    <div className={styles.App}>
      <AppHeader />
      <main className={`${styles.AppMain} container`}>
        {products.data && (
          <IngredientsContext.Provider value={{ products: products.data }}>
            <BurgerIngredients />
            <BurgerConstructor />
          </IngredientsContext.Provider>
        )}
      </main>
    </div>
  );
};

export default App;
