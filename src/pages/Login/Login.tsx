import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";
import { loginScheme } from "./login-scheme";
import Input from "../../UI/Input/Input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "../../UI/Form/Form";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import styles from "./Login.module.css";
import Button from "../../UI/Button/Button";

export const LoginPage = () => {
  const form = useForm<z.infer<typeof loginScheme>>({
    resolver: zodResolver(loginScheme),
  });

  const onSubmit = (data: z.infer<typeof loginScheme>) => console.log(data);

  return (
    <section className={styles.login}>
      <Form {...form}>
        <form className={styles.login__form} onSubmit={form.handleSubmit(onSubmit)}>
          <h1 className={styles["login__form-title"]}>Вход</h1>
          <div className={styles["login__form-content"]}>
            <FormField
              control={form.control}
              name={"email"}
              render={({ field }) => (
                <FormItem className={styles["login__form-item"]}>
                  <FormControl>
                    <Input placeholder={"E-mail"} {...field} onFocus={form.setFocus} />
                  </FormControl>
                  <FormMessage className={styles["login__form-message"]} />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={"password"}
              render={({ field }) => (
                <FormItem className={styles["login__form-item"]}>
                  <FormControl>
                    <Input
                      type={"password"}
                      placeholder={"Пароль"}
                      endIcon={{
                        initial: <EyeIcon />,
                        active: <EyeSlashIcon />,
                      }}
                      {...field}
                      onFocus={form.setFocus}
                    />
                  </FormControl>
                  <FormMessage className={styles["login__form-message"]} />
                </FormItem>
              )}
            />
            <Button type={"primary"} htmlType={"submit"}>
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
