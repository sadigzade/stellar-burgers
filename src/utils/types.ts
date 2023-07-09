import { ChangeEvent } from "react";

export type InputValid = {
  value: string;
  setValue: (value: string) => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: ChangeEvent<HTMLInputElement>) => void;
  isDerty: boolean;
  isEmpty: boolean;
  minLengthError: boolean;
  emailError: boolean;
};
