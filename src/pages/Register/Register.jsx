import React from "react";
import { Link } from "react-router-dom";
import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./Register.module.css";

export const RegisterPage = () => {
  const [nameValue, setNameValue] = React.useState("");
  const [passwordValue, setPasswordValue] = React.useState("");
  const [emailValue, setEmailValue] = React.useState("");

  const inputRef = React.useRef(null);

  const onChangeName = (e) => {
    setNameValue(e.target.value);
  };

  const onChangeEmail = (e) => {
    setEmailValue(e.target.value);
  };

  const onChangePassword = (e) => {
    setPasswordValue(e.target.value);
  };

  return (
    <section className={styles.RegiserPage}>
      <form className={styles.Form}>
        <h1 className="mb-6">Регистрация</h1>

        <div className={`mb-6 ${styles.FormInputs}`}>
          <Input
            type={"text"}
            placeholder={"Имя"}
            onChange={onChangeName}
            value={nameValue}
            name={"name"}
            error={false}
            ref={inputRef}
            errorText={"Ошибка"}
            size={"default"}
          />
          <EmailInput onChange={onChangeEmail} value={emailValue} name={"email"} isIcon={false} />
          <PasswordInput
            onChange={onChangePassword}
            value={passwordValue}
            name={"password"}
            extraClass="mb-2"
          />
        </div>

        <Button htmlType="submit" type="primary" size="medium">
          Зарегистрироваться
        </Button>
      </form>
      <div className={`mt-20 ${styles.RegiserPageFooter}`}>
        <span className="text_color_inactive">Уже зарегистрированы?</span>
        <Link to="/login" className={styles.Login}>
          Войти
        </Link>
      </div>
    </section>
  );
};
