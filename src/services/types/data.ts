export type TRequestData = {
  success: boolean;
  message: string;
};

export type TOrder = {
  number: number;
};

export type TUser = {
  readonly email: string;
  readonly name: string;
};

export type TLogin = {
  readonly success: boolean;
  readonly accessToken: string;
  readonly refreshToken: string;
  readonly user: Readonly<TUser>;
};

export type TRegister = TLogin;

export type TProfile = {
  readonly success: boolean;
  readonly user: Readonly<TUser>;
};

export type TToken = {
  readonly success: boolean;
  readonly accessToken: string;
  readonly refreshToken: string;
};

export type TIngredient = "bun" | "sauce" | "main";

export type TBurgerIngredients = {
  readonly dragId: string;
  readonly _id: string;
  readonly name: string;
  readonly type: TIngredient;
  readonly proteins: number;
  readonly fat: number;
  readonly carbohydrates: number;
  readonly calories: number;
  readonly price: number;
  readonly image: string;
  readonly image_mobile: string;
  readonly image_large: string;
  readonly __v: number;
  count?: number | undefined;
};

export type TForm = {
  nama?: string;
  email?: string;
  password?: string;
};

export type TOptions = {
  type: string;
  form?: TForm;
};
