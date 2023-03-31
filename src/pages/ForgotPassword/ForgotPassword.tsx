import { FormEvent, useCallback, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
import { forgotPasswordRequestThunk } from "../../services/actions/forgotPassword";
import { Button, EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { getCookie } from "../../utils/cookie";
import { useForm } from "../../hooks/useForm";
import Preloader from "../../components/Preloader/Preloader";
import { useDispatch, useSelector } from "../../hooks/hooks";

type ForgotPassword = (e: FormEvent<HTMLFormElement>) => void;

export const ForgotPasswordPage = () => {
  const { values, handleChange } = useForm({ email: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const forgotAnswer = useSelector((state) => state.forgotPassword.success);
  const token = getCookie("accessToken");

  const forgotPassword = useCallback<ForgotPassword>(
    (e) => {
      e.preventDefault();
      dispatch(forgotPasswordRequestThunk(values));
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
    <section className="flex flex-col items-center mt-45">
      <form className="flex flex-col items-center" onSubmit={forgotPassword}>
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
      <div className="flex items-center gap-x-2 mt-20">
        <span className="text_color_inactive">Вспомнили пароль?</span>
        <Link to="/login" className="login">
          Войти
        </Link>
      </div>
    </section>
  );
};
