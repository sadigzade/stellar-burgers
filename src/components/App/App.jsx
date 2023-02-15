import React from "react";

import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import { getIngredients } from "../../utils/burger-api";
import { IngredientsContext } from "../../services/appContext";

import styles from "./App.module.css";
import { calcTotalPrice } from "../../utils/calcTotalPrice";

const totalPriceInitialState = { totalPrice: 0 };

function reducer(state, action) {
  switch (action.type) {
    case "calc":
      return {
        totalPrice: calcTotalPrice(action.payload.bun, action.payload.ingredients),
      };
    default:
      throw new Error(`Wrong type of action: ${action.type}`);
  }
}

const App = () => {
  const [products, setProducts] = React.useState([]);
  const [totalPriceState, totalPriceDispatch] = React.useReducer(
    reducer,
    totalPriceInitialState,
    undefined,
  );

  React.useEffect(() => {
    getIngredients().then((res) => setProducts(res));
  }, []);

  return (
    <div className={styles.App}>
      <AppHeader />
      <main className={`${styles.AppMain} container`}>
        {products.data && <BurgerIngredients products={products.data} />}
        {products.data && (
          <IngredientsContext.Provider
            value={{ products: products.data, totalPriceState, totalPriceDispatch }}>
            <BurgerConstructor />
          </IngredientsContext.Provider>
        )}
      </main>
    </div>
  );
};

export default App;
