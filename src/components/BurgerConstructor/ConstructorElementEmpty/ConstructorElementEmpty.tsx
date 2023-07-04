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
    <div className="hidden lg:flex items-center gap-x-2 mr-4">
      <div className="w-6 shrink-0" />
      <div
        className={`${styles[position]} flex items-center justify-center grow  bg-[#1C1C21] border border-solid border-[##1C1C21] min-h-[80px] w-full`}
        style={{ borderColor }}
      >
        <p className="text text_type_main-medium">{text}</p>
      </div>
    </div>
  );
};

export default ConstructorElementEmpty;
