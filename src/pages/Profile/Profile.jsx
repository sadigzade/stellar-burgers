import React from "react";
import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutRequestAsync, logoutStateReset } from "../../services/logout/action";
import { loginStateReset } from "../../services/login/action";
import { deleteCookie } from "../../utils/cookie";
import { profileRequestUpdate, profileStateReset } from "../../services/profile/action";
import styles from "./Profile.module.css";

export const ProfilePage = () => {
  const [form, setForm] = React.useState({
    name: "",
    email: "",
    password: "",
  });
  const inputRef = React.useRef(null);
  const dispatch = useDispatch();
  const success = useSelector((state) => state.logout.success);
  const userLogin = useSelector((state) => state.login.user);
  const userProfile = useSelector((state) => state.profile.user);
  const [saveVisible, setSaveVisible] = React.useState(false);
  const [isValsid, setIsValid] = React.useState(false);

  const onIconClick = () => {
    inputRef.current.focus();
  };

  const onChange = (e) => {
    setIsValid(true);
    setSaveVisible(true);
    setForm({ ...form, [e.target.name]: e.target.value });

    if (e.target.closest("form").checkValidity()) {
      setIsValid(true);
    }

    if (userProfile[e.target.name] === e.target.value || e.target.value === "") {
      setIsValid(false);
      setSaveVisible(false);
    }
  };

  const cancleClick = (e) => {
    if (userProfile) {
      setForm({ name: userProfile.name, email: userProfile.email, password: "" });
    }
    if (userLogin) {
      setForm({ name: userLogin.name, email: userLogin.email, password: "" });
    }
  };

  const updateClick = React.useCallback(
    (e) => {
      e.preventDefault();
      dispatch(profileRequestUpdate(form));
      setForm({ ...form, password: "" });
    },
    [dispatch, form],
  );

  const logout = React.useCallback(
    (e) => {
      e.preventDefault();
      dispatch(logoutRequestAsync());
    },
    [dispatch],
  );

  React.useEffect(() => {
    if (userLogin) {
      setForm({ ...form, name: userLogin.name, email: userLogin.email });
    }
  }, [userLogin]);

  React.useEffect(() => {
    if (userProfile) {
      setForm({ ...form, name: userProfile.name, email: userProfile.email });
    }
  }, [userProfile]);

  if (success) {
    dispatch(logoutStateReset());
    dispatch(loginStateReset());
    dispatch(profileStateReset());

    deleteCookie("accessToken");
    deleteCookie("refreshToken");

    return <Navigate to="/login" replace />;
  }

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
      <form className={`ml-15 form ${styles.Form}`} onSubmit={updateClick}>
        <Input
          type="text"
          onChange={onChange}
          value={form.name}
          name="name"
          placeholder="Имя"
          icon="EditIcon"
          ref={inputRef}
          onIconClick={onIconClick}
        />
        <EmailInput
          onChange={onChange}
          value={form.email}
          name="email"
          placeholder="Логин"
          isIcon={true}
        />
        <PasswordInput onChange={onChange} value={form.password} name="password" icon="EditIcon" />
        <div>
          {saveVisible && (
            <>
              <Button htmlType="button" type="secondary" size="medium" onClick={cancleClick}>
                Отмена
              </Button>
              <Button htmlType="submit" type="primary" size="medium" disabled={!isValsid}>
                Сохранить
              </Button>
            </>
          )}
        </div>
      </form>
    </section>
  );
};
