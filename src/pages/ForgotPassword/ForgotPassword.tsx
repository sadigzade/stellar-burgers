import React from "react";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { getCookie } from "../../utils/cookie";

import { forgotPasswordScheme } from "./forgot-password-scheme";

import { useDispatch, useSelector } from "../../hooks/hooks";

import { forgotPasswordRequestThunk } from "../../services/actions/forgotPassword";

import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";
import Preloader from "../../UI/Preloader/Preloader";
import { Form, FormControl, FormField, FormItem, FormMessage } from "../../UI/Form/Form";

import styles from "./ForgotPassword.module.css";

export const ForgotPasswordPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const forgotAnswer = useSelector((state) => state.forgotPassword.success);
  const token = getCookie("accessToken");
  const form = useForm<z.infer<typeof forgotPasswordScheme>>({
    resolver: zodResolver(forgotPasswordScheme),
    defaultValues: {
      email: "",
    },
  });

  const forgotPasswordSubmit: SubmitHandler<z.infer<typeof forgotPasswordScheme>> = (data) => {
    dispatch(forgotPasswordRequestThunk(data));
  };

  React.useEffect(() => {
    if (forgotAnswer) {
      navigate("/reset-password", { replace: true });
    }

    if (token) {
      navigate("/", { replace: true });
    }
  }, [forgotAnswer, navigate, token]);

  if (token) {
    return <Preloader />;
  }

  return (
    <section className={styles.forgotpassword}>
      <Form {...form}>
        <form
          className={styles.forgotpassword__form}
          onSubmit={form.handleSubmit(forgotPasswordSubmit)}
        >
          <h1 className={styles["forgotpassword__form-title"]}>Восстановление пароля</h1>
          <div className={styles["forgotpassword__form-content"]}>
            <FormField
              control={form.control}
              name={"email"}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder={"Укажите e-mail"} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type={"primary"} htmlType={"submit"}>
              Восстановить
            </Button>
          </div>
        </form>
      </Form>
      <div className={styles.forgotpassword__footer}>
        <div className={styles["forgotpassword__footer-item"]}>
          <span>Вспомнили пароль?</span>
          <Button type={"secondary"} href={"/login"}>
            Войти
          </Button>
        </div>
      </div>
    </section>
  );
};
