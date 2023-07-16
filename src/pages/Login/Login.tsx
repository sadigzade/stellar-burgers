import { useForm } from "react-hook-form";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";

import { loginScheme } from "./login-scheme";

import { useDispatch } from "../../hooks/hooks";

import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "../../UI/Form/Form";

import styles from "./Login.module.css";
import { loginRequestThunk } from "../../services/actions/login";

export const LoginPage = () => {
  const dispatch = useDispatch();
  const form = useForm<z.infer<typeof loginScheme>>({
    resolver: zodResolver(loginScheme),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: z.infer<typeof loginScheme>) => {
    dispatch(loginRequestThunk(data));
  };

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
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type={"primary"} htmlType={"submit"}>
              Войти
            </Button>
          </div>
        </form>
      </Form>
      <div className={styles.login__footer}>
        <div className={styles["login__footer-block"]}>
          <span>Вы — новый пользователь?</span>
          <Button type={"secondary"} href={"/register"}>
            Зарегистрироваться
          </Button>
        </div>
        <div className={styles["login__footer-block"]}>
          <span>Забыли пароль?</span>
          <Button type={"secondary"} href={"/forgot-password"}>
            Восстановить пароль
          </Button>
        </div>
      </div>
    </section>
  );
};
