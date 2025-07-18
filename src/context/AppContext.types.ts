export type Theme = "light" | "dark";
export type Locale = "fa" | "en";

export interface AppContextProps {
    theme: Theme;
    toggleTheme: () => void;
    locale: Locale;
    toggleLocale: () => void;
}
