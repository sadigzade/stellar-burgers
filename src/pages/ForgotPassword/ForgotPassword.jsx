import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { forgotPasswordRequestAsync } from "../../services/forgotPassword/action";
import { getCookie } from "../../utils/cookie";
import styles from "./ForgotPassword.module.css";
import Preloader from "../../components/Preloader/Preloader";

export const ForgotPasswordPage = () => {
  const [form, setForm] = React.useState({ email: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const forgotAnswer = useSelector((state) => state.forgotPassword.success);
  const token = getCookie("accessToken");

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const forgotPassword = React.useCallback(
    (e) => {
      e.preventDefault();
      dispatch(forgotPasswordRequestAsync(form));
    },
    [dispatch, form],
  );

  React.useEffect(() => {
    if (forgotAnswer) {
      navigate("/reset-password", { replace: true });
    }

    if (token) {
      navigate("/", { replace: true });
    }
  }, [forgotAnswer, navigate, token]);

  if (token) {
    return <Preloader />;
  }

  return (
    <section className={styles.ForgotPasswordPage}>
      <form className={styles.Form}>
        <h1 className="mb-6">Восстановление пароля</h1>

        <div className="mb-6">
          <EmailInput
            onChange={onChange}
            placeholder="Укажите e-mail"
            value={form.email}
            name={"email"}
            isIcon={false}
          />
        </div>

        <Button htmlType="submit" type="primary" size="medium" onClick={forgotPassword}>
          Восстановить
        </Button>
      </form>
      <div className={`mt-20 ${styles.ForgotPasswordPageFooter}`}>
        <span className="text_color_inactive">Вспомнили пароль?</span>
        <Link to="/login" className={styles.Login}>
          Войти
        </Link>
      </div>
    </section>
  );
};
