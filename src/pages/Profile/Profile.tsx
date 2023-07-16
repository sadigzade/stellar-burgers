import React from "react";
import { useDispatch, useSelector } from "../../hooks/hooks";
import { Outlet, useLocation } from "react-router-dom";
import { profileRequestUpdate } from "../../services/actions/profile";
import { logoutRequestThunk } from "../../services/actions/login";
import Sidebar from "../../components/Sidebar/Sidebar";
import { Form, FormControl, FormField, FormItem, FormMessage } from "../../UI/Form/Form";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { profileScheme } from "./profile-scheme";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../../UI/Input/Input";
import { PencilIcon, XMarkIcon } from "@heroicons/react/24/solid";
import Button from "../../UI/Button/Button";
import styles from "./Profile.module.css";

export const ProfilePage = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const userProfile = useSelector((state) => state.profile.user);
  const [saveVisible, setSaveVisible] = React.useState(false);

  const form = useForm<z.infer<typeof profileScheme>>({
    resolver: zodResolver(profileScheme),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const updateSumbit: SubmitHandler<z.infer<typeof profileScheme>> = (data) => {
    dispatch(profileRequestUpdate(data));
  };

  const cancleClick = React.useCallback(() => {
    if (userProfile) {
      form.setValue("name", userProfile.name);
      form.setValue("email", userProfile.email);
      form.setValue("password", "");
    }
  }, [form, userProfile]);

  React.useEffect(() => {
    if (userProfile) {
      form.setValue("name", userProfile.name);
      form.setValue("email", userProfile.email);
    }
  }, [userProfile]);

  return (
    <section className={styles.profile}>
      <div className={styles.profile__sidebar}>
        <Sidebar />
        <p className={styles["profile__sidebar-description"]}>
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>
      {pathname === "/profile" && userProfile && (
        <Form {...form}>
          <form className={styles.profile__form} onSubmit={form.handleSubmit(updateSumbit)}>
            <h1 className={styles["profile__form-title"]}>Профиль</h1>
            <div className={styles["profile__form-content"]}>
              <FormField
                control={form.control}
                name={"name"}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder={"Имя"}
                        {...field}
                        onFocus={form.setFocus}
                        endIcon={{
                          initial: <PencilIcon />,
                          active: <XMarkIcon />,
                        }}
                        changeInput={{
                          initialValue: userProfile.name,
                          setChange: setSaveVisible,
                        }}
                        disabled
                      />
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
                      <Input
                        placeholder={"Логин"}
                        {...field}
                        onFocus={form.setFocus}
                        endIcon={{
                          initial: <PencilIcon />,
                          active: <XMarkIcon />,
                        }}
                        changeInput={{
                          initialValue: userProfile.email,
                          setChange: setSaveVisible,
                        }}
                        disabled
                      />
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
                        {...field}
                        onFocus={form.setFocus}
                        endIcon={{
                          initial: <PencilIcon />,
                          active: <XMarkIcon />,
                        }}
                        changeInput={{
                          initialValue: "",
                          setChange: setSaveVisible,
                        }}
                        disabled
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {saveVisible && (
              <div className={styles["profile__form-footer"]}>
                <Button type={"secondary"} onClick={cancleClick}>
                  Отмена
                </Button>
                <Button type={"primary"} htmlType={"submit"}>
                  Сохранить
                </Button>
              </div>
            )}
          </form>
        </Form>
      )}
      {pathname === "/profile/orders" && (
        <div className="w-full mt-10 mb-5">
          <Outlet />
        </div>
      )}
    </section>
  );
};
