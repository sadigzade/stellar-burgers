import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useDispatch } from "../../hooks/hooks";
import { logoutRequestThunk } from "../../services/actions/login";
import styles from "./Sidebar.module.css";

const Sidebar = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const logout = React.useCallback(
    (e: React.SyntheticEvent) => {
      e.preventDefault();
      dispatch(logoutRequestThunk());
    },
    [dispatch],
  );

  return (
    <ul>
      <li className="flex items-center h-14">
        <NavLink to="/profile" className={styles.link}>
          {({ isActive }) => (
            <span
              className={`text text_type_main-medium ${
                isActive && pathname === "/profile" ? "" : "text_color_inactive"
              }`.trim()}
            >
              Профиль
            </span>
          )}
        </NavLink>
      </li>
      <li className="flex items-center h-14">
        <NavLink to="orders" className={styles.link}>
          {({ isActive }) => (
            <span
              className={`text text_type_main-medium ${
                isActive && pathname === "/profile/orders" ? "" : "text_color_inactive"
              }`.trim()}
            >
              История заказов
            </span>
          )}
        </NavLink>
      </li>
      <li className="flex items-center h-14">
        <NavLink
          to="/login"
          replace
          className={`text text_type_main-medium text_color_inactive ${styles.link}`}
          onClick={logout}
        >
          <span>Выход</span>
        </NavLink>
      </li>
    </ul>
  );
};

export default Sidebar;
