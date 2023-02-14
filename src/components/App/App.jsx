import React from "react";

import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";

import styles from "./App.module.css";

const API_URL = "https://norma.nomoreparties.space/api/ingredients";

const App = () => {
  const [products, setProducts] = React.useState([]);
  const [constructorProducts, setConstructorProducts] = React.useState([]);

  React.useEffect(() => {
    const getProductData = async () => {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();

        setProducts(data);
        setConstructorProducts([
          data.data[0],
          data.data[2],
          data.data[3],
          data.data[4],
          data.data[5],
        ]);
      } catch (error) {
        console.log(error);
      }
    };

    getProductData();
  }, []);

  return (
    <div className={styles.App}>
      <AppHeader />
      <main className={`${styles.AppMain} container`}>
        {products.data && <BurgerIngredients products={products.data} />}
        <BurgerConstructor products={constructorProducts} />
      </main>
    </div>
  );
};

export default App;
