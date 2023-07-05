import { HideIcon, ShowIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ChangeEvent, FC, useRef, useState } from "react";

type InputProps = {
  value: string;
  type: string;
  name: string;
  title: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const Input: FC<InputProps> = ({ value, type, name, title, onChange }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [show, setShow] = useState(false);
  const [inputActive, setInputActive] = useState(false);

  const onClickEmailInput = () => {
    inputRef.current?.focus();
  };

  const onShowPassword = () => {
    setShow(!show);

    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.selectionStart = inputRef.current.selectionEnd = 10000;
      }
    }, 0);
  };

  return (
    <div
      className={`relative flex items-center px-5 lg:px-6 lg:py-3 border-2 border-solid ease-in duration-200 cursor-text bg-[#2F2F37] rounded-[40px] w-full ${
        inputActive ? "border-[#4c4cff]" : "border-transparent"
      }`}
      onClick={onClickEmailInput}
    >
      <label
        className={`absolute text-[#8585AD] ease-in duration-300 z-10 ${
          inputActive || value ? "top-1 lg:top-2" : "top-[14px] lg:top-5"
        }`}
      >
        {title}
      </label>
      <input
        ref={inputRef}
        type={show ? "text" : type}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={() => setInputActive(true)}
        onBlur={() => setInputActive(false)}
        className="h-8 lg:h-5 bg-transparent border-none outline-none caret-white w-full mt-4 text-white text-[16px]"
      />
      {type === "password" && (
        <div className="flex items-center cursor-pointer" onClick={onShowPassword}>
          {show ? <HideIcon type="primary" /> : <ShowIcon type="primary" />}
        </div>
      )}
    </div>
  );
};

export default Input;
