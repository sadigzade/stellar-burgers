import { forwardRef } from "react";

export interface InputProps {
  type?: string;
  placeholder?: string;
  id?: string;
  value?: string | number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
}

const Input = forwardRef(
  (
    { type, placeholder, id, value, onChange, name }: InputProps,
    ref: React.ForwardedRef<HTMLInputElement>,
  ) => (
    <>
      <input type={type} id={id} name={name} value={value} onChange={onChange} ref={ref} />
      <label htmlFor={id}>{placeholder}</label>
    </>
  ),
);

export default Input;
