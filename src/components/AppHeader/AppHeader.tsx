import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import {
  BurgerIcon,
  ListIcon,
  Logo,
  MenuIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import MobileLogo from "../../assets/images/logo-mobile.svg";
import MenuMobile from "./MenuMobile/MenuMobile";
import styles from "./AppHeader.module.css";
import classNames from "classnames";

const AppHeader = () => {
  const [isOpened, setIsOpened] = useState(false);

  const handleMenuClick = () => {
    setIsOpened(!isOpened);

    if (isOpened) {
      document.body.style.overflow = "";
    } else {
      document.body.style.overflow = "hidden";
    }
  };

  return (
    <header className={styles.appheader}>
      <div className={styles.appheader__mobile}>
        <Link to={"/"} className={styles["appheader__mobile-logo"]}>
          <img src={MobileLogo} alt="Mobile Logo" />
        </Link>
        <div className={styles["appheader__mobile-burger"]}>
          <MenuIcon type="primary" onClick={handleMenuClick} />
        </div>
      </div>
      <div className={styles.appheader__desktop}>
        <nav className={styles.appheader__navigation} role="navigation">
          <ul className={styles["appheader__navigation-list"]}>
            <li className={styles["navigation__list-item"]}>
              <NavLink to="/" className={styles["list__item-link"]}>
                {({ isActive }) => (
                  <>
                    <BurgerIcon type={isActive ? "primary" : "secondary"} />
                    <span
                      className={classNames({
                        [styles["navigation__list-item--active"]]: isActive,
                      })}
                    >
                      Конструктор
                    </span>
                  </>
                )}
              </NavLink>
            </li>
            <li className={styles["navigation__list-item"]}>
              <NavLink to="/feed" className={styles["list__item-link"]}>
                {({ isActive }) => (
                  <>
                    <ListIcon type={isActive ? "primary" : "secondary"} />
                    <span
                      className={classNames({
                        [styles["navigation__list-item--active"]]: isActive,
                      })}
                    >
                      Лента заказов
                    </span>
                  </>
                )}
              </NavLink>
            </li>
            <li className={styles["navigation__list-item"]}>
              <NavLink id={"username"} to="/profile" className={styles["list__item-link"]}>
                {({ isActive }) => (
                  <>
                    <ProfileIcon type={isActive ? "primary" : "secondary"} />
                    <span
                      className={classNames({
                        [styles["navigation__list-item--active"]]: isActive,
                      })}
                    >
                      Личный кабинет
                    </span>
                  </>
                )}
              </NavLink>
            </li>
          </ul>
          <div className={styles.appheader__logo}>
            <Link to="/" replace>
              <img
                src={MobileLogo}
                width={55}
                height={55}
                className={styles["appheader__logo--md"]}
                alt="Logo"
              />
              <div className={styles["appheader__logo--xl"]}>
                <Logo />
              </div>
            </Link>
          </div>
        </nav>
      </div>
      <AnimatePresence>{isOpened && <MenuMobile onCloseModal={handleMenuClick} />}</AnimatePresence>
    </header>
  );
};

export default AppHeader;
