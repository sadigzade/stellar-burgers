import { Link, NavLink } from "react-router-dom";
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

const AppHeader = () => {
  return (
    <header className="absolute top-0 left-0 w-full box-shadow bg-[#1c1c21]">
      <div className="container">
        <nav className="relative">
          <ul className="flex items-center justify-between py-4">
            <li className="py-4 pr-5">
              <NavLink to="/" className="flex items-center">
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
            <li className="py-4 px-5">
              <NavLink to="/feed" className="flex items-center">
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
            <li className="flex justify-end grow py-4 pl-5">
              <NavLink id={"username"} to="/profile" className="flex items-center">
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
          <div className="absolute top-1/2 left-1/2 transform-50">
            <Link to="/" replace className="flex">
              <Logo />
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default AppHeader;
