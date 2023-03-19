import { FormEvent, useCallback, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { forgotPasswordRequestAsync } from "../../services/forgotPassword/action";
import { Button, EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { getCookie } from "../../utils/cookie";
import { useForm } from "../../hooks/useForm";
import Preloader from "../../components/Preloader/Preloader";
import styles from "./ForgotPassword.module.css";

type TForgotPassword = (e: FormEvent<HTMLFormElement>) => void;

export const ForgotPasswordPage = () => {
  const { values, handleChange } = useForm({ email: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const forgotAnswer = useSelector<any>((state) => state.forgotPassword.success);
  const token = getCookie("accessToken");

  const forgotPassword = useCallback<TForgotPassword>(
    (e) => {
      e.preventDefault();
      dispatch<any>(forgotPasswordRequestAsync(values));
    },
    [dispatch, values],
  );

  useEffect(() => {
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
      <form className={styles.Form} onSubmit={forgotPassword}>
        <h1 className="mb-6">Восстановление пароля</h1>
        <div className="mb-6">
          <EmailInput
            onChange={handleChange}
            placeholder="Укажите e-mail"
            value={values.email}
            name={"email"}
            isIcon={false}
          />
        </div>
        <Button htmlType="submit" type="primary" size="medium">
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
