import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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
import ModalSwitch from "../ModalSwitch/ModalSwitch";
import ProtectedRouteElement from "../ProtectedRouteElement/ProtectedRouteElement";
import Preloader from "../Preloader/Preloader";
import { ingredientsRequestAsync } from "../../services/burgerIngredients/action";
import { checkUserAuth } from "../../services/profile/action";
import { getCookie } from "../../utils/cookie";
import styles from "./App.module.css";

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const user = useSelector<any>((state) => state.profile.user);
  const token = getCookie("accessToken");
  const background = location.state && location.state.background;

  React.useEffect(() => {
    dispatch<any>(ingredientsRequestAsync());
    dispatch<any>(checkUserAuth());
  }, [dispatch]);

  return (
    <div className={styles.App}>
      <AppHeader />
      <main className={`${styles.AppMain} container`}>
        {user || !token ? (
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
            <Route path="/ingredients/:id" element={<IngredientPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        ) : (
          <Preloader />
        )}
        <ModalSwitch background={background} />
      </main>
    </div>
  );
};

export default App;
