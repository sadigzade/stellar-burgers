import React from "react";
import styles from "./AppHeader.module.css";
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

class AppHeader extends React.Component {
  render() {
    return (
      <header className={styles.AppHeader}>
        <div className="container">
          <nav className={styles.HeaderNav}>
            <ul className={styles.NavList}>
              <li className={`${styles.NavListItem} pt-4 pb-4 pr-5`}>
                <a href="/">
                  <BurgerIcon type="primary" />
                  <span className="pl-2">Конструктор</span>
                </a>
              </li>
              <li className={`${styles.NavListItem} pt-4 pb-4 pr-5 pl-5`}>
                <a href="/">
                  <ListIcon type="secondary" />
                  <span className="pl-2 text_color_inactive">Лента заказов</span>
                </a>
              </li>
              <li className={`${styles.NavListItem} pt-4 pb-4 pl-5`}>
                <a href="/">
                  <ProfileIcon type="primary" />
                  <span className="pl-2">Личный кабинет</span>
                </a>
              </li>
            </ul>
            <div className={styles.NavLogo}>
              <a href="/">
                <Logo />
              </a>
            </div>
          </nav>
        </div>
      </header>
    );
  }
}

export default AppHeader;
