import React from "react";

import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";

import { bun, ingredients } from "../../utils/data";

import styles from "./App.module.css";

class App extends React.Component {
  render() {
    return (
      <div className={styles.App}>
        <AppHeader />
        <main className={`${styles.AppMain} container`}>
          <BurgerIngredients />
          <BurgerConstructor bun={bun} ingredients={ingredients} />
        </main>
      </div>
    );
  }
}

export default App;
