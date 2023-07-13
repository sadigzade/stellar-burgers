import { HideIcon, ShowIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { forwardRef, useState } from "react";

interface InputProps {
  id?: string;
  type?: string;
  name?: string;
  placeholder?: string;
  value?: string | number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ id, type, name, placeholder, value, onChange, onBlur }, ref) => {
    const [show, setShow] = useState(false);
    const [inputActive, setInputActive] = useState(false);

    const onClickOutside = () => {};
    const onShowPassword = () => {
      setShow(!show);
    };
    const onBlurInput = () => {
      setInputActive(false);
    };

    return (
      <div className="flex flex-col gap-y-2">
        <div
          className={`relative flex items-center px-5 lg:px-6 lg:py-3 border-2 border-solid ease-in duration-200 cursor-text bg-[#2F2F37] rounded-[40px] w-full ${
            inputActive ? "border-[#4c4cff]" : "border-transparent"
          }`}
          onClick={onClickOutside}
        >
          <label
            htmlFor={id}
            className={`absolute text-[#8585AD] ease-in duration-300 z-10 ${
              inputActive || value ? "top-1 lg:top-2" : "top-[14px] lg:top-5"
            }`}
          >
            {placeholder}
          </label>
          <input
            ref={ref}
            id={id}
            type={show ? "text" : type}
            name={name}
            value={value}
            onChange={onChange}
            onFocus={() => setInputActive(true)}
            onBlur={onBlurInput}
            className="h-8 lg:h-5 bg-transparent input-help border-none outline-none caret-white w-full mt-4 text-white text-[16px] focus:text-white"
          />

          {type === "password" && (
            <div className="flex items-center cursor-pointer" onClick={onShowPassword}>
              {show ? <HideIcon type="primary" /> : <ShowIcon type="primary" />}
            </div>
          )}
        </div>
      </div>
    );
  },
);

export default Input;
