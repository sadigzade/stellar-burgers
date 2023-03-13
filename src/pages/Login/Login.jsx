import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { loginRequestAsync } from "../../services/login/action";
import Preloader from "../../components/Preloader/Preloader";
import { getCookie } from "../../utils/cookie";
import styles from "./Login.module.css";

export const LoginPage = () => {
  const [form, setForm] = React.useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.login.user);
  const token = getCookie("accessToken");

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const login = React.useCallback(
    (e) => {
      e.preventDefault();
      dispatch(loginRequestAsync(form));
    },
    [dispatch, form],
  );

  React.useEffect(() => {
    if (user) {
      navigate("/", { replace: true });
    }
  }, [navigate, user]);

  if (token) {
    return <Preloader />;
  }

  return (
    <section className={styles.LoginPage}>
      <form className={styles.Form}>
        <h1 className="mb-6">Вход</h1>

        <div className={`mb-6 ${styles.FormInputs}`}>
          <EmailInput onChange={onChange} value={form.email} name={"email"} isIcon={false} />
          <PasswordInput
            onChange={onChange}
            value={form.password}
            name={"password"}
            extraClass="mb-2"
          />
        </div>

        <Button htmlType="submit" type="primary" size="medium" onClick={login}>
          Войти
        </Button>
      </form>
      <div className={`mt-20 ${styles.LoginPageFooter}`}>
        <div>
          <span className="text_color_inactive">Вы — новый пользователь?</span>
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
