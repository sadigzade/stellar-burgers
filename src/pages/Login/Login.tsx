import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";
import { loginScheme } from "./login-scheme";
import Input from "../../components/Input/Input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "../../components/Form/Form";
// import Input from "../../components/Input";

export const LoginPage = () => {
  const form = useForm<z.infer<typeof loginScheme>>({
    resolver: zodResolver(loginScheme),
  });

  const onSubmit = (data: z.infer<typeof loginScheme>) => console.log(data);

  return (
    <section className="mt-4 md:mt-[180px] px-2">
      <Form {...form}>
        <form className="flex flex-col items-center" onSubmit={form.handleSubmit(onSubmit)}>
          <h1 className="mb-6 text-[28px] text-center">Вход</h1>
          <div className="flex flex-col gap-y-5 lg:gap-y-6 max-w-[480px] w-full">
            <FormField
              control={form.control}
              name={"email"}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder={"E-mail"} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={"password"}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder={"Пароль"} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <Input type={"email"} label={"E-mail"} name="email" control={control} />
          <Input type={"password"} label={"Пароль"} name="password" control={control} /> */}
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
      </Form>
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
