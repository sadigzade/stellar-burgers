import { FormEvent, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { forgotPasswordRequestThunk } from "../../services/actions/forgotPassword";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { getCookie } from "../../utils/cookie";
import Preloader from "../../UI/Preloader/Preloader";
import { useDispatch, useSelector } from "../../hooks/hooks";

type ForgotPassword = (e: FormEvent<HTMLFormElement>) => void;

export const ForgotPasswordPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const forgotAnswer = useSelector((state) => state.forgotPassword.success);
  const token = getCookie("accessToken");

  const forgotPasswordSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // dispatch(forgotPasswordRequestThunk(data));
  };

  useEffect(() => {
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
    <section className="mt-4 md:mt-[180px] px-2">
      <form className="flex flex-col items-center" onSubmit={forgotPasswordSubmit}>
        <h1 className="mb-6 text-[28px] text-center">Восстановление пароля</h1>
        <div className="flex flex-col gap-y-5 lg:gap-y-6 max-w-[480px] w-full">
          {/* <Input
            type={"email"}
            name={"email"}
            label={"Укажите e-mail"}
            register={{ ...register("email") }}
            errorMessage={errors.email?.message}
            control={control}
          /> */}
          <Button
            id={"button-login"}
            htmlType="submit"
            type="primary"
            size={window.innerWidth < 768 ? "small" : "medium"}
            extraClass="self-center"
          >
            Восстановить
          </Button>
        </div>
      </form>
      <div className="flex flex-col items-center gap-y-5 mt-10 lg:mt-20">
        <div className="flex flex-col lg:flex-row lg:gap-x-2 items-center">
          <span className="text_color_inactive">Вспомнили пароль?</span>
          <Link to="/login" className="login">
            Войти
          </Link>
        </div>
      </div>
    </section>
  );
};
