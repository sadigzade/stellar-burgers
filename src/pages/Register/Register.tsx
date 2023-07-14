import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "../../hooks/hooks";
import { getCookie } from "../../utils/cookie";
import { signupRequestAsync } from "../../services/actions/signup";
import Preloader from "../../UI/Preloader/Preloader";
import { SubmitHandler, useForm } from "react-hook-form";
import Input from "../../UI/Input/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInputsTypes } from "../../@types/App.types";
import { registerScheme } from "./register-scheme";
import { Form, FormControl, FormField, FormItem, FormMessage } from "../../UI/Form/Form";
import Button from "../../UI/Button/Button";
import styles from "./Register.module.css";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { z } from "zod";

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
                    <Input placeholder={"Имя"} {...field} onFocus={form.setFocus} />
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
                    <Input placeholder={"E-mail"} {...field} onFocus={form.setFocus} />
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
