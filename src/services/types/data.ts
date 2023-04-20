import { WS_CONNECTION_START, WS_DISCONNECTING } from "../constants/wsActionTypes";

export type TRequestData = {
  readonly success: boolean;
  readonly message: string;
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
  count: number;
};

export type TForm = {
  nama?: string;
  email?: string;
  password?: string;
};

export type TOptions = {
  readonly type: string;
  form?: TForm;
};

export enum TWSOrdersStatus {
  CREATED = "created",
  PENDING = "pending",
  DONE = "done",
}

export type TWSOrders = {
  readonly _id: string;
  readonly ingredients: string[];
  readonly status: TWSOrdersStatus;
  readonly name: string;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly number: number;
};

export type TWSGetMessage = {
  readonly orders: ReadonlyArray<TWSOrders>;
  readonly total: number;
  readonly totalToday: number;
};

export type TWSStoreActions = {
  wsInit: typeof WS_CONNECTION_START;
  wsDisconnecting: typeof WS_DISCONNECTING;
};
