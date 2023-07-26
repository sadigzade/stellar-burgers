import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import {
  ForgotPasswordPage,
  HomePage,
  IngredientPage,
  LoginPage,
  NotFoundPage,
  ProfilePage,
  RegisterPage,
  ResetPasswordPage,
  FeedPage,
  OrderPage,
} from "../../pages";

import AppHeader from "../AppHeader/AppHeader";
import Preloader from "../../UI/Preloader/Preloader";
import ModalSwitch from "../ModalSwitch/ModalSwitch";
import HistoryOrders from "../HistoryOrders/HistoryOrders";
import ProtectedRouteElement from "../ProtectedRouteElement/ProtectedRouteElement";

import { getCookie } from "../../utils/cookie";
import { useSelector, useDispatch } from "../../hooks/hooks";
import { checkUserAuth } from "../../services/actions/profile";
import { ingredientsRequestAsync } from "../../services/actions/burgerIngredients";

import styles from "./App.module.css";

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const user = useSelector((state) => state.profile.user);
  const token = getCookie("accessToken");
  const background = location.state && location.state.background;

  useEffect(() => {
    dispatch(ingredientsRequestAsync());
    dispatch(checkUserAuth());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.app__main}>
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
            >
              <Route path="/profile/orders" element={<HistoryOrders />} />
            </Route>
            <Route
              path="/login"
              element={
                <ProtectedRouteElement onlyUnAuth>
                  <LoginPage />
                </ProtectedRouteElement>
              }
            />
            <Route path="/feed" element={<FeedPage />} />
            <Route path="/feed/:id" element={<OrderPage />} />
            <Route path="/profile/orders/:id" element={<OrderPage />} />
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
