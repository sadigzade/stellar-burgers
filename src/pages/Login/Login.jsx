import React from "react";
import { Link } from "react-router-dom";
import {
  Button,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./Login.module.css";

export const LoginPage = () => {
  const [passwordValue, setPasswordValue] = React.useState("");
  const [emailValue, setEmailValue] = React.useState("");

  const onChangeEmail = (e) => {
    setEmailValue(e.target.value);
  };

  const onChangePassword = (e) => {
    setPasswordValue(e.target.value);
  };

  return (
    <section className={styles.LoginPage}>
      <form className={styles.Form}>
        <h1 className="mb-6">Вход</h1>

        <div className={`mb-6 ${styles.FormInputs}`}>
          <EmailInput onChange={onChangeEmail} value={emailValue} name={"email"} isIcon={false} />
          <PasswordInput
            onChange={onChangePassword}
            value={passwordValue}
            name={"password"}
            extraClass="mb-2"
          />
        </div>

        <Button htmlType="submit" type="primary" size="medium">
          Войти
        </Button>
      </form>
      <div className={`mt-20 ${styles.LoginPageFooter}`}>
        <div>
          <span className="text_color_inactive">Вы — новый пользователь?</span>
          <Link to="/register" className={styles.Login}>
            Зарегистрироваться
          </Link>
        </div>
        <div>
          <span className="text_color_inactive">Забыли пароль?</span>
          <Link to="/forgot-password" className={styles.Login}>
            Восстановить пароль
          </Link>
        </div>
      </div>
    </section>
  );
};
