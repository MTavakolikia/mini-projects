export type Locale = 'en' | 'fa';

export interface AppContextType {
    locale: Locale;
    toggleLocale: () => void;
}
