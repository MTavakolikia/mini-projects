import { useContext } from "react";
import { AppContext } from "./AppContext";

export const useAppContext = () => {
    const ctx = useContext(AppContext);
    if (!ctx) throw new Error("AppContext not available");
    return ctx;
};
