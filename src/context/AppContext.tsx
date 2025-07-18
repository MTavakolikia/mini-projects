import { createContext } from "react";
import type { AppContextProps } from "./AppContext.types";

export const AppContext = createContext<AppContextProps | null>(null);
