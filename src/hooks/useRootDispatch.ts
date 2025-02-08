import { RootDispatch } from "../store/init";
import { useDispatch } from "react-redux";

export const useRootDispatch: () => RootDispatch = useDispatch;
