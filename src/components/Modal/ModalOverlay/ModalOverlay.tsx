import { FC } from "react";
import styles from "./ModalOverlay.module.css";

interface IModalOverlay {
  onCloseClick: () => void;
}

const ModalOverlay: FC<IModalOverlay> = ({ onCloseClick }) => {
  return <div className={styles.ModalOverlay} onClick={onCloseClick}></div>;
};

export default ModalOverlay;
