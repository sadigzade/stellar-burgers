import React from "react";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";

import { useDispatch } from "../../hooks/hooks";

import { getCookie } from "../../utils/cookie";

import { registerScheme } from "./register-scheme";

import { signupRequestAsync } from "../../services/actions/signup";

import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";
import Preloader from "../../UI/Preloader/Preloader";
import { Form, FormControl, FormField, FormItem, FormMessage } from "../../UI/Form/Form";

import styles from "./Register.module.css";

export const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = getCookie("accessToken");
  const form = useForm<z.infer<typeof registerScheme>>({
    resolver: zodResolver(registerScheme),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const registerSubmit: SubmitHandler<z.infer<typeof registerScheme>> = (data) => {
    dispatch(signupRequestAsync(data));
  };

  React.useEffect(() => {
    if (token) {
      navigate("/", { replace: true });
    }
  }, [navigate, token]);

  if (token) {
    return <Preloader />;
  }

  return (
    <section className={styles.register}>
      <Form {...form}>
        <form className={styles.register__form} onSubmit={form.handleSubmit(registerSubmit)}>
          <h1 className={styles["register__form-title"]}>Регистрация</h1>
          <div className={styles["register__form-content"]}>
            <FormField
              control={form.control}
              name={"name"}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder={"Имя"} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
              Зарегистрироваться
            </Button>
          </div>
        </form>
      </Form>
      <div className={styles.register__footer}>
        <div className={styles["register__footer-content"]}>
          <span>Уже зарегистрированы?</span>
          <Button type={"secondary"} href={"/login"}>
            Войти
          </Button>
        </div>
      </div>
    </section>
  );
};
