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
    <div className="flex items-center space-x-2 w-full pr-4">
      <div className="h-6 w-6" />
      <div
        className={`${
          styles[position]
        } flex items-center justify-center bg-[#2f2f37] border border-solid border-[#2f2f37] min-h-[80px] w-full ${
          position === "center" ? "" : ""
        }`}
        style={{ borderColor }}
      >
        <p className="text text_type_main-medium">{text}</p>
      </div>
    </div>
  );
};

export default ConstructorElementEmpty;
