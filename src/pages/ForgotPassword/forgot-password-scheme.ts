import { z } from "zod";

export const forgotPasswordScheme = z.object({
  email: z.string().nonempty("Введите e-mail").email("Введите корректный e-mail").default(""),
});
