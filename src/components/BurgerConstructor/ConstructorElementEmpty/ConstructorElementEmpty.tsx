import { FC } from "react";
import styles from "./ConstructorElementEmpty.module.css";

interface IConstructorElementEmptyProps {
  position: string;
  borderColor: string;
  text: string;
}

const ConstructorElementEmpty: FC<IConstructorElementEmptyProps> = ({
  position,
  borderColor,
  text,
}) => {
  return (
    <div
      className={`${styles.ConstructorElementEmpty} ${styles[position]}`}
      style={{ borderColor }}>
      <p className="text text_type_main-medium">{text}</p>
    </div>
  );
};

export default ConstructorElementEmpty;
