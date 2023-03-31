import { FormEvent, useCallback } from "react";
import { useDispatch } from "../../hooks/hooks";
import { Link } from "react-router-dom";
import {
  Button,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { logoutRequestThunk } from "../../services/actions/login";
import { useForm } from "../../hooks/useForm";

type Login = (e: FormEvent<HTMLFormElement>) => void;

export const LoginPage = () => {
  const { values, handleChange } = useForm({ email: "", password: "" });
  const dispatch = useDispatch();

  const login = useCallback<Login>(
    (e) => {
      e.preventDefault();
      dispatch(logoutRequestThunk(values));
    },
    [dispatch, values],
  );

  return (
    <section className="mt-45">
      <form className="flex flex-col items-center" onSubmit={login}>
        <h1 className="mb-6">Вход</h1>
        <div className="flex flex-col gap-y-6 mb-6">
          <EmailInput onChange={handleChange} value={values.email} name={"email"} isIcon={false} />
          <PasswordInput
            onChange={handleChange}
            value={values.password}
            name={"password"}
            extraClass="mb-2"
          />
        </div>
        <Button htmlType="submit" type="primary" size="medium">
          Войти
        </Button>
      </form>
      <div className="flex flex-col items-center gap-y-4 mt-20">
        <div className="flex items-center gap-x-4">
          <span className="text_color_inactive">Вы — новый пользователь?</span>
          <Link to="/register" className="login">
            Зарегистрироваться
          </Link>
        </div>
        <div className="flex items-center gap-x-4">
          <span className="text_color_inactive">Забыли пароль?</span>
          <Link to="/forgot-password" className="login">
            Восстановить пароль
          </Link>
        </div>
      </div>
    </section>
  );
};
