import { useState, ChangeEvent } from "react";

export const useForm = (inputValues: { [key: string]: string } = {}) => {
  const [values, setValues] = useState(inputValues);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  return { values, handleChange, setValues };
};
