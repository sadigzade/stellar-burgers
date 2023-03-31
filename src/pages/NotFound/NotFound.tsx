import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import ErrorImg from "../../images/404.svg";

export const NotFoundPage = () => {
  const navigate = useNavigate();
  const clickBack = useCallback(() => {
    navigate("/");
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center gap-y-10 h-full">
      <img src={ErrorImg} className="w-[350]" alt="404" />
      <p className="text text_type_main-medium">Похоже ты потерялся?</p>
      <Button htmlType="button" type="primary" size="medium" onClick={clickBack}>
        Вернуться на главную
      </Button>
    </div>
  );
};
