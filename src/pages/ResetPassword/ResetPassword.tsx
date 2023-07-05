import { FormEvent, useCallback, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "../../hooks/hooks";
import {
  resetPasswordInitial,
  resetPasswordRequestAsync,
} from "../../services/actions/resetPassword";
import { forgotPasswordReset } from "../../services/actions/forgotPassword";
import { getCookie } from "../../utils/cookie";
import { useForm } from "../../hooks/useForm";
import Preloader from "../../components/Preloader/Preloader";
import Input from "../../components/Input/Input";

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
    <section className="mt-4 md:mt-[180px] px-2">
      <form className="flex flex-col items-center" onSubmit={resetPassword}>
        <h1 className="mb-6 text-[28px] text-center">Восстановление пароля</h1>
        <div className="flex flex-col gap-y-5 lg:gap-y-6 max-w-[480px] w-full">
          <Input
            value={values.password}
            type={"password"}
            name={"password"}
            title={"Введите новый пароль"}
            onChange={handleChange}
          />
          <Input
            value={values.token}
            type={"text"}
            name={"token"}
            title={"Введите код из письма"}
            onChange={handleChange}
          />
          <Button
            id={"button-login"}
            htmlType="submit"
            type="primary"
            size={window.innerWidth < 768 ? "small" : "medium"}
            extraClass="self-center"
          >
            Сохранить
          </Button>
        </div>
      </form>
      <div className="flex flex-col items-center gap-y-5 mt-10 lg:mt-20">
        <div className="flex flex-col lg:flex-row lg:gap-x-2 items-center">
          <span className="text_color_inactive">Вспомнили пароль?</span>
          <Link to="/login" className="login">
            Войти
          </Link>
        </div>
      </div>
    </section>
  );
};
