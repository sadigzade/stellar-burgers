import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AppHeader from "../AppHeader/AppHeader";
import {
  ForgotPasswordPage,
  HomePage,
  LoginPage,
  NotFoundPage,
  ProfilePage,
  RegisterPage,
  ResetPasswordPage,
} from "../../pages";
import ModalSwitch from "../ModalSwitch/ModalSwitch";
import IngredientDetails from "../BurgerIngredients/IngredientCategory/Ingredient/IngredientDetails/IngredientDetails";
import { checkUserAuth } from "../../services/profile/action";
import { ingredientsRequestAsync } from "../../services/burgerIngredients/action";
import ProtectedRouteElement from "../ProtectedRouteElement/ProtectedRouteElement";
import styles from "./App.module.css";

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  let background = location.state && location.state.background ? true : false;

  React.useEffect(() => {
    dispatch(ingredientsRequestAsync());
    dispatch(checkUserAuth());
  }, [dispatch]);

  return (
    <div className={styles.App}>
      <AppHeader />
      <main className={`${styles.AppMain} container`}>
        <Routes location={background || location}>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/profile"
            element={
              <ProtectedRouteElement>
                <ProfilePage />
              </ProtectedRouteElement>
            }
          />
          <Route
            path="/login"
            element={
              <ProtectedRouteElement onlyUnAuth>
                <LoginPage />
              </ProtectedRouteElement>
            }
          />
          <Route path="/ingredients/:id" element={<IngredientDetails />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <ModalSwitch background={background} />
      </main>
    </div>
  );
};

export default App;
