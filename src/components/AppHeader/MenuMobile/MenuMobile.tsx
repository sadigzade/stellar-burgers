import { FC, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  BurgerIcon,
  Button,
  CloseIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink, useLocation } from "react-router-dom";

const variantFrom = {
  transform: "translateX(-100%)",
};
const variantTo = {
  transform: "translateX(0)",
};

type MenuMobileProps = {
  onCloseModal: () => void;
};

const MenuMobile: FC<MenuMobileProps> = ({ onCloseModal }) => {
  const [isSubMenu, setIsSubMenu] = useState(false);
  const { pathname } = useLocation();

  return (
    <motion.div
      initial={variantFrom}
      animate={variantTo}
      exit={variantFrom}
      className="absolute top-0 left-0 w-full h-screen bg-[#1c1c21] duration-300 ease-in-out"
    >
      <div className="flex items-center justify-between px-2 py-4">
        <h3 className="text text_type_main-medium">Меню</h3>
        <div className="cursor-pointer">
          <CloseIcon type="primary" onClick={onCloseModal} />
        </div>
      </div>
      <nav role="navigation">
        <ul>
          <li>
            <div className="px-2 py-3 flex items-center justify-between">
              <NavLink to="/profile">
                {({ isActive }) => (
                  <div className="flex items-center space-x-2">
                    <ProfileIcon type={isActive ? "primary" : "secondary"} />
                    <span
                      className={`text text_type_main-default ${
                        isActive ? "" : "text_color_inactive"
                      }`}
                    >
                      Личный кабинет
                    </span>
                  </div>
                )}
              </NavLink>
              <div className="cursor-pointer" onClick={() => setIsSubMenu(!isSubMenu)}>
                {isSubMenu ? <ArrowUpIcon type="primary" /> : <ArrowDownIcon type="primary" />}
              </div>
            </div>
            {isSubMenu && (
              <ul className="pl-10 pb-2">
                <li className="py-2">
                  <NavLink to="/profile">
                    {({ isActive }) => (
                      <span
                        className={`text text_type_main_default duration-300 ease-in-out hover:text-white ${
                          isActive && pathname === "/profile" ? "" : "text_color_inactive"
                        }`}
                      >
                        Профиль
                      </span>
                    )}
                  </NavLink>
                </li>
                <li className="py-2">
                  <NavLink to="/profile/orders">
                    {({ isActive }) => (
                      <span
                        className={`text text_type_main_default duration-300 ease-in-out hover:text-white ${
                          isActive && pathname === "/profile/orders" ? "" : "text_color_inactive"
                        }`}
                      >
                        История заказов
                      </span>
                    )}
                  </NavLink>
                </li>
                <li className="py-2">
                  <Button
                    htmlType="button"
                    type="secondary"
                    size="large"
                    extraClass="p-0 text_color_inactive"
                  >
                    Выход
                  </Button>
                </li>
              </ul>
            )}
          </li>
          <li className="px-2 py-3">
            <NavLink to="/" className="flex items-center space-x-2">
              {({ isActive }) => (
                <>
                  <BurgerIcon type={isActive ? "primary" : "secondary"} />
                  <span
                    className={`text text_type_main-default duration-300 ease-in-out hover:text-white ${
                      isActive ? "" : "text_color_inactive"
                    }`}
                  >
                    Конструктор бургеров
                  </span>
                </>
              )}
            </NavLink>
          </li>
          <li className="px-2 py-3">
            <NavLink to="/feed" className="flex items-center space-x-2">
              {({ isActive }) => (
                <>
                  <ListIcon type={isActive ? "primary" : "secondary"} />
                  <span
                    className={`text text_type_main-default duration-300 ease-in-out hover:text-white ${
                      isActive ? "" : "text_color_inactive"
                    }`}
                  >
                    Лента заказов
                  </span>
                </>
              )}
            </NavLink>
          </li>
        </ul>
      </nav>
    </motion.div>
  );
};

export default MenuMobile;
