import { ZodType, z } from "zod";
import { Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import Input from "../../components/Input/Input";

export type LoginInputs = {
  email: string;
  password: string;
};

const schema: ZodType<LoginInputs> = z.object({
  email: z.string().nonempty("Обязательное поле").email("Некорректный e-mail"),
  password: z.string().nonempty("Обязательное поле").min(8, "Пароль должен быть больше 8 символов"),
});

export const LoginPage = () => {
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const formSubmit: SubmitHandler<LoginInputs> = (data) => console.log(data);

  return (
    <section className="mt-4 md:mt-[180px] px-2">
      <form className="flex flex-col items-center" onSubmit={handleSubmit(formSubmit)}>
        <h1 className="mb-6 text-[28px] text-center">Вход</h1>
        <div className="flex flex-col gap-y-5 lg:gap-y-6 max-w-[480px] w-full">
          <Input
            type={"email"}
            name={"email"}
            label={"E-mail"}
            register={{ ...register("email") }}
            errorMessage={errors.email?.message}
            control={control}
          />
          <Input
            type={"password"}
            name={"password"}
            label={"Пароль"}
            register={{ ...register("password") }}
            errorMessage={errors.password?.message}
            control={control}
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
