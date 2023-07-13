import { useState, ChangeEvent } from "react";

export const useForm = (inintialValue: { [key: string]: string }) => {
  const [values, setValues] = useState(inintialValue);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setValues({ ...values, [name]: value });
  };

  return { values, onChange, setValues };
};
