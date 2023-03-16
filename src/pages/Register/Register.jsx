import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { getCookie } from "../../utils/cookie";
import { signupRequestAsync } from "../../services/signup/action";
import Preloader from "../../components/Preloader/Preloader";
import { useForm } from "../../hooks/useForm";

import styles from "./Register.module.css";

export const RegisterPage = () => {
  const { values, handleChange } = useForm({ name: "", email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = getCookie("accessToken");

  const register = React.useCallback(
    (e) => {
      e.preventDefault();
      dispatch(signupRequestAsync(values));
    },
    [dispatch, values],
  );

  React.useEffect(() => {
    if (token) {
      navigate("/", { replace: true });
    }
  }, [navigate, token]);

  if (token) {
    return <Preloader />;
  }

  return (
    <section className={styles.RegiserPage}>
      <form className={styles.Form} onSubmit={register}>
        <h1 className="mb-6">Регистрация</h1>
        <div className={`mb-6 ${styles.FormInputs}`}>
          <Input
            type={"text"}
            placeholder={"Имя"}
            onChange={handleChange}
            value={values.name}
            name={"name"}
            error={false}
            errorText={"Ошибка"}
            size={"default"}
          />
          <EmailInput onChange={handleChange} value={values.email} name={"email"} isIcon={false} />
          <PasswordInput
            onChange={handleChange}
            value={values.password}
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
