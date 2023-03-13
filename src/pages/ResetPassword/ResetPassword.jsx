import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import {
  resetPasswordInitial,
  resetPasswordRequestAsync,
} from "../../services/resetPassword/action";
import styles from "./ResetPassword.module.css";
import { getCookie } from "../../utils/cookie";
import Preloader from "../../components/Preloader/Preloader";
import { forgotPasswordReset } from "../../services/forgotPassword/action";

export const ResetPasswordPage = () => {
  const [form, setForm] = React.useState({ password: "", token: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const forgotAnswer = useSelector((state) => state.forgotPassword.success);
  const resetAnswer = useSelector((state) => state.resetPassword.success);
  const token = getCookie("accessToken");

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const resetPassword = React.useCallback(
    (e) => {
      e.preventDefault();
      dispatch(resetPasswordRequestAsync(form));
    },
    [dispatch, form],
  );

  React.useEffect(() => {
    if (resetAnswer) {
      navigate("/login", { replace: true });
    }

    if (!forgotAnswer) {
      navigate("/forgot-password", { replace: true });
    }

    if (token) {
      navigate("/", { replace: true });
    }

    return () => {
      dispatch(resetPasswordInitial());
      dispatch(forgotPasswordReset());
    };
  }, [dispatch, forgotAnswer, navigate, resetAnswer, token]);

  if (token || !forgotAnswer) {
    return <Preloader />;
  }

  return (
    <section className={styles.ResetPasswordPage}>
      <form className={styles.Form}>
        <h1 className="mb-6">Восстановление пароля</h1>

        <div className={`mb-6 ${styles.FormInputs}`}>
          <PasswordInput
            onChange={onChange}
            value={form.password}
            name="password"
            placeholder="Введите новый пароль"
          />
          <Input
            type={"text"}
            placeholder={"Введите код из письма"}
            onChange={onChange}
            value={form.token}
            name={"token"}
            error={false}
            errorText={"Ошибка"}
            size={"default"}
          />
        </div>

        <Button htmlType="submit" type="primary" size="medium" onClick={resetPassword}>
          Сохранить
        </Button>
      </form>
      <div className={`mt-20 ${styles.ResetPasswordPageFooter}`}>
        <span className="text_color_inactive">Вспомнили пароль?</span>
        <Link to="/login" className={styles.Login}>
          Войти
        </Link>
      </div>
    </section>
  );
};
