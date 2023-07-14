import * as z from "zod";

export const registerScheme = z.object({
  name: z.string().nonempty("Введите имя").default(""),
  email: z.string().nonempty("Введите e-mail").email("Введите корректный e-mail").default(""),
  password: z
    .string()
    .nonempty("Введите пароль")
    .min(8, "Минимальное число символов 8")
    .default(""),
});
