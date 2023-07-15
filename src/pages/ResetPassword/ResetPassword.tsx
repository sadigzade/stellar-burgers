import React from "react";
import { useNavigate } from "react-router-dom";

import { SubmitHandler, useForm } from "react-hook-form";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";

import { useDispatch, useSelector } from "../../hooks/hooks";

import {
  resetPasswordInitial,
  resetPasswordRequestAsync,
} from "../../services/actions/resetPassword";
import { forgotPasswordReset } from "../../services/actions/forgotPassword";

import { getCookie } from "../../utils/cookie";

import { resetPasswordScheme } from "./reset-password-scheme";

import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";
import Preloader from "../../UI/Preloader/Preloader";
import { Form, FormControl, FormField, FormItem } from "../../UI/Form/Form";

import styles from "./ResetPassword.module.css";

export const ResetPasswordPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const forgotAnswer = useSelector((state) => state.forgotPassword.success);
  const resetAnswer = useSelector((state) => state.resetPassword.success);
  const token = getCookie("accessToken");
  const form = useForm<z.infer<typeof resetPasswordScheme>>({
    resolver: zodResolver(resetPasswordScheme),
    defaultValues: {
      password: "",
      code: "",
    },
  });

  const resetPassword: SubmitHandler<z.infer<typeof resetPasswordScheme>> = (data) => {
    dispatch(resetPasswordRequestAsync(data));
  };

  React.useEffect(() => {
    if (resetAnswer) {
      navigate("/login", { replace: true });
    }

    if (!forgotAnswer) {
      navigate("/forgot-password", { replace: true });
    }

    if (token) {
      navigate("/", { replace: true });
    }

    return () => {
      dispatch(resetPasswordInitial());
      dispatch(forgotPasswordReset());
    };
  }, [dispatch, forgotAnswer, navigate, resetAnswer, token]);

  if (token || !forgotAnswer) {
    return <Preloader />;
  }

  return (
    <section className={styles.resetpassword}>
      <Form {...form}>
        <form className={styles.resetpassword__form} onSubmit={form.handleSubmit(resetPassword)}>
          <h1 className={styles["resetpassword__form-title"]}>Восстановление пароля</h1>
          <div className={styles["resetpassword__form-content"]}>
            <FormField
              control={form.control}
              name={"password"}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type={"password"}
                      placeholder={"Введите новый пароль"}
                      {...field}
                      onFocus={form.setFocus}
                      endIcon={{
                        initial: <EyeIcon />,
                        active: <EyeSlashIcon />,
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={"code"}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder={"Введите код из письма"} {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type={"primary"} htmlType={"submit"}>
              Сохранить
            </Button>
          </div>
        </form>
      </Form>
      <div className={styles.resetpassword__footer}>
        <div className={styles["resetpassword__footer-item"]}>
          <span>Вспомнили пароль?</span>
          <Button type={"secondary"} href={"/login"}>
            Войти
          </Button>
        </div>
      </div>
    </section>
  );
};
