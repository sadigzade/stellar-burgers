import { FormEvent, SyntheticEvent, useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "../../hooks/hooks";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { profileRequestUpdate } from "../../services/actions/profile";
import { logoutRequestThunk } from "../../services/actions/login";
import { useForm } from "../../hooks/useForm";
import styles from "./Profile.module.css";

type UpdateSumbitType = (e: FormEvent<HTMLFormElement>) => void;

export const ProfilePage = () => {
  const { values, handleChange, setValues } = useForm({
    name: "",
    email: "",
    password: "",
  });
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const userProfile = useSelector((state) => state.profile.user);

  const onIconClick = () => {
    inputRef?.current?.focus();
  };

  const updateSumbit = useCallback<UpdateSumbitType>(
    (e) => {
      e.preventDefault();
      dispatch(profileRequestUpdate(values));
      setValues({ ...values, password: "" });
    },
    [dispatch, setValues, values],
  );

  const cancleClick = useCallback(
    (e: SyntheticEvent) => {
      if (userProfile) {
        setValues({ name: userProfile.name, email: userProfile.email, password: "" });
      }
    },
    [setValues, userProfile],
  );

  const logout = useCallback(
    (e: SyntheticEvent) => {
      e.preventDefault();
      dispatch(logoutRequestThunk());
    },
    [dispatch],
  );

  useEffect(() => {
    if (userProfile) {
      setValues({ ...values, name: userProfile.name, email: userProfile.email });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userProfile]);

  return (
    <section className="flex gap-x-14">
      <div className="max-w-[320px] w-full mt-30">
        <ul>
          <li className="flex items-center h-14">
            <NavLink to="/profile" className={styles.link}>
              {({ isActive }) => (
                <span
                  className={`text text_type_main-medium ${
                    isActive && pathname === "/profile" ? "" : "text_color_inactive"
                  }`.trim()}>
                  Профиль
                </span>
              )}
            </NavLink>
          </li>
          <li className="flex items-center h-14">
            <NavLink to="s" className={styles.link}>
              {({ isActive }) => (
                <span
                  className={`text text_type_main-medium ${
                    isActive && pathname === "/profile/s" ? "" : "text_color_inactive"
                  }`.trim()}>
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
              onClick={logout}>
              <span>Выход</span>
            </NavLink>
          </li>
        </ul>
        <p className="text text_type_main-default text_color_inactive mt-20 opacity-60">
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>
      {pathname === "/profile" && (
        <form className="flex flex-col items-end gap-y-6 form mt-30" onSubmit={updateSumbit}>
          <Input
            type="text"
            onChange={handleChange}
            value={values.name}
            name="name"
            placeholder="Имя"
            icon="EditIcon"
            ref={inputRef}
            onIconClick={onIconClick}
          />
          <EmailInput
            onChange={handleChange}
            value={values.email}
            name="email"
            placeholder="Логин"
            isIcon={true}
          />
          <PasswordInput
            onChange={handleChange}
            value={values.password}
            name="password"
            icon="EditIcon"
          />
          {userProfile &&
            (values.name !== userProfile.name ||
              values.email !== userProfile.email ||
              values.password !== "") && (
              <div className="flex items-center">
                <Button htmlType="button" type="secondary" size="medium" onClick={cancleClick}>
                  Отмена
                </Button>
                <Button htmlType="submit" type="primary" size="medium">
                  Сохранить
                </Button>
              </div>
            )}
        </form>
      )}
      <div className="w-full mt-10 mb-5">
        <Outlet />
      </div>
    </section>
  );
};
