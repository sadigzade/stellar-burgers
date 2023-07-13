import { ZodType, z } from "zod";
import { FormInputsTypes } from "../@types/App.types";

export const loginFormScheme: ZodType<Pick<FormInputsTypes, "email" | "password">> = z.object({
  email: z.string().nonempty("Обязательное поле").email("Некорректный e-mail"),
  password: z.string().nonempty("Обязательное поле").min(8, "Минимальное количество символов 8"),
});

export const registerFormScheme: ZodType<FormInputsTypes> = z.object({
  name: z.string().nonempty("Обязательное поле"),
  email: z.string().nonempty("Обязательное поле").email("Некорректный e-mail"),
  password: z.string().nonempty("Обязательное поле").min(8, "Минимальное количество символов 8"),
});
