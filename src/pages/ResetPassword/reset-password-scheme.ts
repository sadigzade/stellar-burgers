import * as z from "zod";

export const resetPasswordScheme = z.object({
  password: z
    .string()
    .nonempty("Введите новый пароль")
    .min(8, "Минимальное число символов 8")
    .default(""),
  code: z.string().nonempty("Введите код").default(""),
});
