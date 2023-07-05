import { FormEvent, useCallback } from "react";
import { useDispatch } from "../../hooks/hooks";
import { Link } from "react-router-dom";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { loginRequestThunk } from "../../services/actions/login";
import { useForm } from "../../hooks/useForm";
import Input from "../../components/Input/Input";

type Login = (e: FormEvent<HTMLFormElement>) => void;

export const LoginPage = () => {
  const { values, handleChange } = useForm({ email: "", password: "" });
  const dispatch = useDispatch();

  const login = useCallback<Login>(
    (e) => {
      e.preventDefault();
      dispatch(loginRequestThunk(values));
    },
    [dispatch, values],
  );

  return (
    <section className="mt-4 lg:mt-[180px] px-2">
      <form className="flex flex-col items-center" onSubmit={login}>
        <h1 className="mb-6 text-[28px]">Вход</h1>
        <div className="flex flex-col gap-y-5 lg:gap-y-6 max-w-[480px] w-full">
          <Input
            value={values.email}
            type={"email"}
            name={"email"}
            title={"E-mail"}
            onChange={handleChange}
          />
          <Input
            value={values.password}
            type={"password"}
            name={"password"}
            title={"Пароль"}
            onChange={handleChange}
          />
          <Button
            id={"button-login"}
            htmlType="submit"
            type="primary"
            size={window.innerWidth < 768 ? "small" : "medium"}
            extraClass="self-center"
          >
            Войти
          </Button>
        </div>
      </form>
      <div className="flex flex-col items-center gap-y-5 mt-10 lg:mt-20">
        <div className="flex flex-col lg:flex-row lg:gap-x-2 items-center">
          <span className="text_color_inactive">Вы — новый пользователь?</span>
          <Link to="/register" className="login">
            Зарегистрироваться
          </Link>
        </div>
        <div className="flex flex-col lg:flex-row lg:gap-x-2 items-center">
          <span className="text_color_inactive">Забыли пароль?</span>
          <Link to="/forgot-password" className="login">
            Восстановить пароль
          </Link>
        </div>
      </div>
    </section>
  );
};
