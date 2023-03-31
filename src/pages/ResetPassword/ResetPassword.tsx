import { FormEvent, useCallback, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "../../hooks/hooks";
import {
  resetPasswordInitial,
  resetPasswordRequestAsync,
} from "../../services/actions/resetPassword";
import { forgotPasswordReset } from "../../services/actions/forgotPassword";
import { getCookie } from "../../utils/cookie";
import { useForm } from "../../hooks/useForm";
import Preloader from "../../components/Preloader/Preloader";

type TResetPassword = (e: FormEvent<HTMLFormElement>) => void;

export const ResetPasswordPage = () => {
  const { values, handleChange } = useForm({ password: "", token: "" });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const forgotAnswer = useSelector((state) => state.forgotPassword.success);
  const resetAnswer = useSelector((state) => state.resetPassword.success);
  const token = getCookie("accessToken");

  const resetPassword = useCallback<TResetPassword>(
    (e) => {
      e.preventDefault();
      dispatch(resetPasswordRequestAsync(values));
    },
    [dispatch, values],
  );

  useEffect(() => {
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
    <section className="flex flex-col items-center mt-45">
      <form className="flex flex-col items-center" onSubmit={resetPassword}>
        <h1 className="mb-6">Восстановление пароля</h1>
        <div className="flex flex-col items-center gap-y-6 mb-6">
          <PasswordInput
            onChange={handleChange}
            value={values.password}
            name="password"
            placeholder="Введите новый пароль"
          />
          <Input
            type={"text"}
            placeholder={"Введите код из письма"}
            onChange={handleChange}
            value={values.token}
            name={"token"}
            error={false}
            errorText={"Ошибка"}
            size={"default"}
          />
        </div>
        <Button htmlType="submit" type="primary" size="medium">
          Сохранить
        </Button>
      </form>
      <div className="flex gap-x-2 mt-20">
        <span className="text_color_inactive">Вспомнили пароль?</span>
        <Link to="/login" className="login">
          Войти
        </Link>
      </div>
    </section>
  );
};
