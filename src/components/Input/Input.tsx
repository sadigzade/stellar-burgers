import { FC, useState } from "react";
import { HideIcon, ShowIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Control, UseFormRegisterReturn, useController } from "react-hook-form";
import { LoginInputs } from "../../pages/Login/Login";

type InputProps = {
  type: string;
  name: keyof LoginInputs;
  label: string;
  register: UseFormRegisterReturn;
  errorMessage?: string;
  control: Control<LoginInputs>;
};

const Input: FC<InputProps> = ({ type, name, label, register, errorMessage, control }) => {
  const [show, setShow] = useState(false);
  const [inputActive, setInputActive] = useState(false);

  const { field } = useController({
    name,
    control,
  });

  const onShowPassword = () => {
    setShow(!show);
  };

  return (
    <div className="flex flex-col gap-y-2">
      <div
        className={`relative flex items-center px-5 lg:px-6 lg:py-3 border-2 border-solid ease-in duration-200 cursor-text bg-[#2F2F37] rounded-[40px] w-full ${
          inputActive ? "border-[#4c4cff]" : "border-transparent"
        }`}
      >
        <label
          className={`absolute text-[#8585AD] ease-in duration-300 z-10 ${
            inputActive || field.value ? "top-1 lg:top-2" : "top-[14px] lg:top-5"
          }`}
        >
          {label}
        </label>
        <input
          {...register}
          value={field.value}
          onChange={field.onChange}
          type={show ? "text" : type}
          onFocus={() => setInputActive(true)}
          onBlur={() => setInputActive(false)}
          className="h-8 lg:h-5 bg-transparent input-help border-none outline-none caret-white w-full mt-4 text-white text-[16px] focus:text-white"
        />

        {type === "password" && (
          <div className="flex items-center cursor-pointer" onClick={onShowPassword}>
            {show ? <HideIcon type="primary" /> : <ShowIcon type="primary" />}
          </div>
        )}
      </div>
      {errorMessage && <span className="text-[red]">{errorMessage}</span>}
    </div>
  );
};

export default Input;
