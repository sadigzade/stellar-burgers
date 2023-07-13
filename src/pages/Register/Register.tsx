import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch } from "../../hooks/hooks";
import { getCookie } from "../../utils/cookie";
import { signupRequestAsync } from "../../services/actions/signup";
import Preloader from "../../components/Preloader/Preloader";
import { SubmitHandler, useForm } from "react-hook-form";
import { registerFormScheme } from "../../utils/scheme";
import { z } from "zod";
import Input from "../../components/Input/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInputsTypes } from "../../@types/App.types";

export const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = getCookie("accessToken");
  const { handleSubmit, control } = useForm<z.infer<typeof registerFormScheme>>({
    mode: "onChange",
    resolver: zodResolver(registerFormScheme),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const registerSubmit: SubmitHandler<FormInputsTypes> = (data) => {
    dispatch(signupRequestAsync(data));
  };

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
      <form className="flex flex-col items-center" onSubmit={handleSubmit(registerSubmit)}>
        <h1 className="mb-6 text-[28px] text-center">Регистрация</h1>
        <div className="flex flex-col gap-y-5 lg:gap-y-6 max-w-[480px] w-full">
          {/* <Input type={"text"} label={"Имя"} name={"name"} control={control} />
          <Input type={"email"} label={"E-mail"} name={"email"} control={control} />
          <Input type={"password"} label={"Пароль"} name={"password"} control={control} /> */}
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
