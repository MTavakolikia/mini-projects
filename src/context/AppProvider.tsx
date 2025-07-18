import { useState, useEffect, type ReactNode } from "react";
import { AppContext } from "./AppContext";
import type { Locale, Theme } from "./AppContext.types";

export function AppProvider({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useState<Theme>("light");
    const [locale, setLocale] = useState<Locale>("fa");

    useEffect(() => {
        document.documentElement.classList.toggle("dark", theme === "dark");
        document.documentElement.lang = locale;
        document.documentElement.dir = locale === "fa" ? "rtl" : "ltr";
    }, [theme, locale]);

    const toggleTheme = () => setTheme((prev) => (prev === "light" ? "dark" : "light"));
    const toggleLocale = () => setLocale((prev) => (prev === "fa" ? "en" : "fa"));

    return (
        <AppContext.Provider
            value={{ theme, toggleTheme, locale, toggleLocale }}
        >
            {children}
        </AppContext.Provider>
    );
}
