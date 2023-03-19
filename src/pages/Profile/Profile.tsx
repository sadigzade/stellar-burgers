import { FormEvent, SyntheticEvent, useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { logoutRequestAsync } from "../../services/login/action";
import { profileRequestUpdate } from "../../services/profile/action";
import { useForm } from "../../hooks/useForm";
import styles from "./Profile.module.css";

type updateSumbitType = (e: FormEvent<HTMLFormElement>) => void;

export const ProfilePage = () => {
  const { values, handleChange, setValues } = useForm({
    name: "",
    email: "",
    password: "",
  });
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const userLogin: any = useSelector<any>((state) => state.login.user);
  const userProfile: any = useSelector<any>((state) => state.profile.user);

  const onIconClick = () => {
    inputRef?.current?.focus();
  };

  const updateSumbit = useCallback<updateSumbitType>(
    (e) => {
      e.preventDefault();
      dispatch<any>(profileRequestUpdate(values));
      setValues({ ...values, password: "" });
    },
    [dispatch, setValues, values],
  );

  const cancleClick = useCallback(
    (e: SyntheticEvent) => {
      if (userProfile) {
        setValues({ name: userProfile.name, email: userProfile.email, password: "" });
      }
      if (userLogin) {
        setValues({ name: userLogin.name, email: userLogin.email, password: "" });
      }
    },
    [setValues, userLogin, userProfile],
  );

  const logout = useCallback(
    (e: SyntheticEvent) => {
      e.preventDefault();
      dispatch<any>(logoutRequestAsync());
    },
    [dispatch],
  );

  useEffect(() => {
    if (userLogin) {
      setValues({ ...values, name: userLogin.name, email: userLogin.email });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userLogin]);

  useEffect(() => {
    if (userProfile) {
      setValues({ ...values, name: userProfile.name, email: userProfile.email });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userProfile]);

  return (
    <section className={`mt-30 ${styles.ProfilePage}`}>
      <div className={styles.Sidebar}>
        <ul>
          <li className={styles.SidebarItem}>
            <NavLink to="/profile">
              {({ isActive }) => (
                <span
                  className={`text text_type_main-medium ${
                    isActive ? "" : "text_color_inactive"
                  }`.trim()}>
                  Профиль
                </span>
              )}
            </NavLink>
          </li>
          <li className={styles.SidebarItem}>
            <NavLink to="orders">
              {({ isActive }) => (
                <span
                  className={`text text_type_main-medium ${
                    isActive ? "" : "text_color_inactive"
                  }`.trim()}>
                  История заказов
                </span>
              )}
            </NavLink>
          </li>
          <li className={styles.SidebarItem}>
            <Button
              htmlType="button"
              type="secondary"
              size="large"
              className={`text text_type_main-medium text_color_inactive ${styles.ButtonExit}`}
              onClick={logout}>
              Выход
            </Button>
          </li>
        </ul>
        <p
          className={`text text_type_main-default text_color_inactive mt-20 ${styles.Description}`}>
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>
      <form className={`ml-15 form ${styles.Form}`} onSubmit={updateSumbit}>
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
        <div>
          <Button htmlType="button" type="secondary" size="medium" onClick={cancleClick}>
            Отмена
          </Button>
          <Button htmlType="submit" type="primary" size="medium">
            Сохранить
          </Button>
        </div>
      </form>
    </section>
  );
};
