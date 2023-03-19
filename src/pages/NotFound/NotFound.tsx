import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import ErrorImg from "../../images/404.svg";
import styles from "./NotFound.module.css";

export const NotFoundPage = () => {
  const navigate = useNavigate();
  const clickBack = useCallback(() => {
    navigate("/");
  }, [navigate]);

  return (
    <div className={styles.NotFoundPage}>
      <img src={ErrorImg} className={styles.ErrorImage} alt="404" />
      <p className="text text_type_main-medium">Похоже ты потерялся?</p>
      <Button htmlType="button" type="primary" size="medium" onClick={clickBack}>
        Вернуться на главную
      </Button>
    </div>
  );
};
