import styles from "./AppHeader.module.css";
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, NavLink } from "react-router-dom";

const AppHeader = () => {
  return (
    <header className={styles.AppHeader}>
      <div className="container">
        <nav className={styles.HeaderNav}>
          <ul className={styles.NavList}>
            <li className={`${styles.NavListItem} pt-4 pb-4 pr-5`}>
              <NavLink to="/">
                {({ isActive }) => (
                  <>
                    <BurgerIcon type={isActive ? "primary" : "secondary"} />
                    <span className={`pl-2 ${isActive ? "" : "text_color_inactive"}`.trim()}>
                      Конструктор
                    </span>
                  </>
                )}
              </NavLink>
            </li>
            <li className={`${styles.NavListItem} pt-4 pb-4 pr-5 pl-5`}>
              <NavLink to="/feed">
                {({ isActive }) => (
                  <>
                    <ListIcon type={isActive ? "primary" : "secondary"} />
                    <span className={`pl-2 ${isActive ? "" : "text_color_inactive"}`.trim()}>
                      Лента заказов
                    </span>
                  </>
                )}
              </NavLink>
            </li>
            <li className={`${styles.NavListItem} pt-4 pb-4 pl-5`}>
              <NavLink to="/profile">
                {({ isActive }) => (
                  <>
                    <ProfileIcon type={isActive ? "primary" : "secondary"} />
                    <span className={`pl-2 ${isActive ? "" : "text_color_inactive"}`.trim()}>
                      Личный кабинет
                    </span>
                  </>
                )}
              </NavLink>
            </li>
          </ul>
          <div className={styles.NavLogo}>
            <Link to="/" replace>
              <Logo />
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default AppHeader;
