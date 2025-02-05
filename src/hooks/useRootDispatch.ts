import { RootDispatch } from "../store/storage";
import { useDispatch } from "react-redux";

export const useRootDispatch: () => RootDispatch = useDispatch;
