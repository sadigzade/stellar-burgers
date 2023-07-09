import { useState, ChangeEvent } from "react";

export const useForm = (
  inintialValue: string = "",
  validations: { [key: string]: number | boolean },
) => {
  const [value, setValue] = useState(inintialValue);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return { value, onChange, setValue };
};
