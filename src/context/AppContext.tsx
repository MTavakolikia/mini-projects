import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

type Theme = "light" | "dark";
type Locale = "fa" | "en";

interface AppContextProps {
    theme: Theme;
    toggleTheme: () => void;
    locale: Locale;
    toggleLocale: () => void;
}

const AppContext = createContext<AppContextProps | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useState<Theme>("light");
    const [locale, setLocale] = useState<Locale>("fa");

    useEffect(() => {
        document.documentElement.classList.toggle("dark", theme === "dark");
    }, [theme]);

    const toggleTheme = () => setTheme((prev) => (prev === "light" ? "dark" : "light"));
    const toggleLocale = () => setLocale((prev) => (prev === "fa" ? "en" : "fa"));

    return (
        <AppContext.Provider value={{ theme, toggleTheme, locale, toggleLocale }}>
            {children}
        </AppContext.Provider>
    );
}

export const useAppContext = () => {
    const ctx = useContext(AppContext);
    if (!ctx) throw new Error("context is missing");
    return ctx;
}
