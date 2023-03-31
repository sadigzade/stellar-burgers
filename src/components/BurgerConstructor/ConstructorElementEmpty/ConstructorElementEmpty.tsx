import { FC } from "react";
import styles from "./ConstructorElementEmpty.module.css";

type ConstructorElementEmptyProps = {
  position: string;
  borderColor: string;
  text: string;
};

const ConstructorElementEmpty: FC<ConstructorElementEmptyProps> = ({
  position,
  borderColor,
  text,
}) => {
  return (
    <div
      className={`${styles[position]} flex items-center justify-center bg-[#2f2f37] border border-solid border-[#2f2f37] min-h-[80px] max-w-[536px] w-full grow`}
      style={{ borderColor }}>
      <p className="text text_type_main-medium">{text}</p>
    </div>
  );
};

export default ConstructorElementEmpty;
