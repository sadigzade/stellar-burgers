import React from "react";
import ErrorImg from "../../images/404.svg";
import styles from "./NotFound.module.css";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useNavigate } from "react-router-dom";

export const NotFoundPage = () => {
  const navigate = useNavigate();
  const clickBack = () => {
    navigate("/");
  };

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
