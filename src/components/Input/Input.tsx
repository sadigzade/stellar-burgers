import { FC, useRef, useState } from "react";
import { RegisterOptions, useFormContext } from "react-hook-form";
import { HideIcon, ShowIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ErrorMessage } from "@hookform/error-message";
import { LoginInputs } from "../../pages/Login/Login";

type InputProps = {
  type: string;
  name: keyof LoginInputs;
  title: string;
  validations?: RegisterOptions;
};

const Input: FC<InputProps> = ({ validations, type, name, title }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [show, setShow] = useState(false);
  const [inputActive, setInputActive] = useState(false);
  const {
    register,
    formState: { errors },
  } = useFormContext<LoginInputs>();

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
    <div className="flex flex-col gap-y-2">
      <div
        className={`relative flex items-center px-5 lg:px-6 lg:py-3 border-2 border-solid ease-in duration-200 cursor-text bg-[#2F2F37] rounded-[40px] w-full ${
          inputActive ? "border-[#4c4cff]" : "border-transparent"
        }`}
        onClick={onClickEmailInput}
      >
        <label
          className={`absolute text-[#8585AD] ease-in duration-300 z-10 ${
            inputActive ? "top-1 lg:top-2" : "top-[14px] lg:top-5"
          }`}
        >
          {title}
        </label>
        <input
          {...register(name, validations)}
          ref={inputRef}
          type={show ? "text" : type}
          onFocus={() => setInputActive(true)}
          onBlur={() => setInputActive(false)}
          className="h-8 lg:h-5 bg-transparent input-help border-none outline-none caret-white w-full mt-4 text-white text-[16px] focus:text-white"
        />

        {/* <ErrorMessage errors={errors} name={name} render={({ message }) => <p>{message}</p>} /> */}
        {type === "password" && (
          <div className="flex items-center cursor-pointer" onClick={onShowPassword}>
            {show ? <HideIcon type="primary" /> : <ShowIcon type="primary" />}
          </div>
        )}
      </div>
      {/* {errors[name] && (
        <span className="text-[red]">{errors[name]?.message?.toString() || "Error!"}</span>
      )} */}
      {errors[name] && <p>{errors[name]?.message}</p>}
    </div>
  );
};

export default Input;
