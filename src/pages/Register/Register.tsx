import { FormEvent, useCallback, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "../../hooks/hooks";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { signupRequestAsync } from "../../services/actions/signup";
import { getCookie } from "../../utils/cookie";
import { useForm } from "../../hooks/useForm";
import Preloader from "../../components/Preloader/Preloader";
import Input from "../../components/Input/Input";

type Register = (e: FormEvent<HTMLFormElement>) => void;

export const RegisterPage = () => {
  const { values, handleChange } = useForm({ name: "", email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = getCookie("accessToken");

  const register = useCallback<Register>(
    (e) => {
      e.preventDefault();
      dispatch(signupRequestAsync(values));
    },
    [dispatch, values],
  );

  useEffect(() => {
    if (token) {
      navigate("/", { replace: true });
    }
  }, [navigate, token]);

  if (token) {
    return <Preloader />;
  }

  return (
    <section className="mt-4 md:mt-[180px] px-2">
      <form className="flex flex-col items-center" onSubmit={register}>
        <h1 className="mb-6 text-[28px] text-center">Регистрация</h1>
        <div className="flex flex-col gap-y-5 lg:gap-y-6 max-w-[480px] w-full">
          <Input
            value={values.name}
            type={"text"}
            name={"name"}
            title={"Имя"}
            onChange={handleChange}
          />
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
            htmlType="submit"
            type="primary"
            size={window.innerWidth < 768 ? "small" : "medium"}
            extraClass="self-center"
          >
            Зарегистрироваться
          </Button>
        </div>
      </form>
      <div className="flex flex-col items-center">
        <div className="flex flex-col lg:flex-row lg:gap-x-2 items-center mt-10">
          <span className="text_color_inactive">Уже зарегистрированы?</span>
          <Link to="/login" className="login">
            Войти
          </Link>
        </div>
      </div>
    </section>
  );
};
