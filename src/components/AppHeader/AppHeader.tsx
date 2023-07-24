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
    <header className="fixed top-0 left-0 z-20 w-full box-shadow bg-[#1c1c21]">
      <div className="flex items-center justify-between px-2 py-3 md:hidden">
        <Link to={"/"} className="w-10 h-10">
          <img src={MobileLogo} alt="Mobile Logo" />
        </Link>
        <div className="cursor-pointer">
          <MenuIcon type="primary" onClick={handleMenuClick} />
        </div>
      </div>
      <div className="max-w-[1280px] w-full md:px-2 lg:px-5 mx-auto hidden md:block">
        <nav className="relative" role="navigation">
          <ul className="flex items-center justify-between py-4">
            <li className="py-4 pr-5">
              <NavLink to="/" className="flex items-center">
                {({ isActive }) => (
                  <>
                    <BurgerIcon type={isActive ? "primary" : "secondary"} />
                    <span
                      className={`pl-2 hover:text-white duration-300 ease-in-out ${
                        isActive ? "" : "text_color_inactive"
                      }`.trim()}
                    >
                      Конструктор
                    </span>
                  </>
                )}
              </NavLink>
            </li>
            <li className="py-4 px-5">
              <NavLink to="/feed" className="flex items-center">
                {({ isActive }) => (
                  <>
                    <ListIcon type={isActive ? "primary" : "secondary"} />
                    <span
                      className={`pl-2 hover:text-white duration-300 ease-in-out ${
                        isActive ? "" : "text_color_inactive"
                      }`.trim()}
                    >
                      Лента заказов
                    </span>
                  </>
                )}
              </NavLink>
            </li>
            <li className="flex justify-end grow py-4 pl-5">
              <NavLink id={"username"} to="/profile" className="flex items-center">
                {({ isActive }) => (
                  <>
                    <ProfileIcon type={isActive ? "primary" : "secondary"} />
                    <span
                      className={`pl-2 hover:text-white duration-300 ease-in-out ${
                        isActive ? "" : "text_color_inactive"
                      }`.trim()}
                    >
                      Личный кабинет
                    </span>
                  </>
                )}
              </NavLink>
            </li>
          </ul>
          <div className="absolute top-1/2 left-1/2 transform-50">
            <Link to="/" replace className="flex">
              <div className="hidden xl:block">
                <Logo />
              </div>
              <img src={MobileLogo} width={55} height={55} className="block xl:hidden" alt="Logo" />
            </Link>
          </div>
        </nav>
      </div>
      <AnimatePresence>{isOpened && <MenuMobile onCloseModal={handleMenuClick} />}</AnimatePresence>
    </header>
  );
};

export default AppHeader;
