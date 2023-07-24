import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import ErrorImg from "../../assets/images/404.svg";
import styles from "./NotFound.module.css";
import Button from "../../UI/Button/Button";

export const NotFoundPage = () => {
  const navigate = useNavigate();
  const clickBack = useCallback(() => {
    navigate("/");
  }, [navigate]);

  return (
    <div className={styles.notfound}>
      <img src={ErrorImg} className={styles.notfound__img} alt="404" />
      <p className={styles.notfound__text}>Похоже ты потерялся?</p>
      <Button type={"primary"} htmlType={"button"} onClick={clickBack}>
        Вернуться на главную
      </Button>
    </div>
  );
};
