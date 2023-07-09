import { FormEvent, useCallback, useRef, useState } from "react";
import { useDispatch } from "../../hooks/hooks";
import { Link } from "react-router-dom";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { loginRequestThunk } from "../../services/actions/login";
import Input from "../../components/Input/Input";
import { FormProvider, SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { ZodType, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export type LoginInputs = {
  email: string;
};

export const LoginPage = () => {
  const dispatch = useDispatch();
  const onSubmit: SubmitHandler<LoginInputs> = (data) => console.log(data);
  const onError: SubmitErrorHandler<LoginInputs> = (error) => console.log(error);

  const schema: ZodType<LoginInputs> = z.object({
    email: z
      .string({
        required_error: "Обязательно для заполнения",
      })
      .email({ message: "Некорректный e-mail" })
      .default(""),
  });

  const methods = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
    },
  });

  // useCallback();
  // (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   // dispatch(
  //   //   loginRequestThunk({
  //   //     email: email.value,
  //   //     password: password.value,
  //   //   }),
  //   // );
  // },
  // [dispatch],

  return (
    <section className="mt-4 md:mt-[180px] px-2">
      <FormProvider {...methods}>
        <form
          className="flex flex-col items-center"
          onSubmit={methods.handleSubmit(onSubmit, onError)}
        >
          <h1 className="mb-6 text-[28px] text-center">Вход</h1>
          <div className="flex flex-col gap-y-5 lg:gap-y-6 max-w-[480px] w-full">
            <Input
              type={"email"}
              name={"email"}
              title={"E-mail"}
              validations={{
                required: true,
                pattern: {
                  value:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: "Введите корректный E-mail",
                },
              }}
            />
            {/* <Input
              type={"password"}
              name={"password"}
              title={"Пароль"}
              validations={{
                required: true,
                minLength: {
                  value: 8,
                  message: "Пароль должен быть больше 8 символов",
                },
              }}
            /> */}
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
      </FormProvider>
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
