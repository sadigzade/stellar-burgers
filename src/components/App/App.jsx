import React from "react";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { applyMiddleware, compose, createStore } from "redux";
import { Routes, Route } from "react-router-dom";

import AppHeader from "../AppHeader/AppHeader";
import {
  ForgotPasswordPage,
  HomePage,
  IngredientPage,
  LoginPage,
  NotFoundPage,
  ProfilePage,
  RegisterPage,
  ResetPasswordPage,
} from "../../pages";
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
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/ingredients/:id" element={<IngredientPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
      </div>
    </Provider>
  );
};

export default App;
