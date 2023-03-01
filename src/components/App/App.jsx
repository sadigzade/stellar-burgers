import React from "react";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { applyMiddleware, compose, createStore } from "redux";

import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import { rootReducer } from "../../services/reducers";

import styles from "./App.module.css";

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

const App = () => {
  return (
    <Provider store={store}>
      <div className={styles.App}>
        <AppHeader />
        <main className={`${styles.AppMain} container`}>
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients />
            <BurgerConstructor />
          </DndProvider>
        </main>
      </div>
    </Provider>
  );
};

export default App;
