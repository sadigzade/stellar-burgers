import { FormEvent, useCallback, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "../../hooks/hooks";
import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { signupRequestAsync } from "../../services/actions/signup";
import { getCookie } from "../../utils/cookie";
import { useForm } from "../../hooks/useForm";
import Preloader from "../../components/Preloader/Preloader";

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
    <section className="flex flex-col items-center mt-45">
      <form className="flex flex-col items-center" onSubmit={register}>
        <h1 className="mb-6">Регистрация</h1>
        <div className="flex flex-col items-center gap-y-6 mb-6">
          <Input
            type={"text"}
            placeholder={"Имя"}
            onChange={handleChange}
            value={values.name}
            name={"name"}
            error={false}
            errorText={"Ошибка"}
            size={"default"}
          />
          <EmailInput onChange={handleChange} value={values.email} name={"email"} isIcon={false} />
          <PasswordInput
            onChange={handleChange}
            value={values.password}
            name={"password"}
            extraClass="mb-2"
          />
        </div>
        <Button htmlType="submit" type="primary" size="medium">
          Зарегистрироваться
        </Button>
      </form>
      <div className="flex gap-x-2 mt-20">
        <span className="text_color_inactive">Уже зарегистрированы?</span>
        <Link to="/login" className="login">
          Войти
        </Link>
      </div>
    </section>
  );
};
