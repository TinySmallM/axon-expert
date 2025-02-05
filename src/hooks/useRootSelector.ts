import { RootState } from "../store/storage";
import { useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";

export const useRootSelector: TypedUseSelectorHook<RootState> = useSelector;
