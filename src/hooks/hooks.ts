import {
  TypedUseSelectorHook,
  useSelector as selectorHook,
  useDispatch as dispatchHook,
} from "react-redux";
import { AppDispatch, AppThunk, RootState } from "../services/types";

type DispatchFunc = () => AppDispatch | AppThunk;
export const useDispatch: DispatchFunc = dispatchHook;
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
