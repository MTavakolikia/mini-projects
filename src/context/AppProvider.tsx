import { useState, useEffect, type ReactNode } from 'react';
import { AppContext } from './AppContext';
import type { Locale } from './AppContext.types';
import i18n from '@/i18n'; // 👈 اضافه‌شدن i18n

export function AppProvider({ children }: { children: ReactNode }) {
    const [locale, setLocale] = useState<Locale>(() => {
        const saved = localStorage.getItem('locale');
        return (saved === 'fa' || saved === 'en' ? saved : 'fa') as Locale;
    });

    useEffect(() => {
        localStorage.setItem('locale', locale);
        document.documentElement.lang = locale;
        document.documentElement.dir = locale === 'fa' ? 'rtl' : 'ltr';

        i18n.changeLanguage(locale);
    }, [locale]);

    const toggleLocale = () => {
        setLocale((prev) => (prev === 'fa' ? 'en' : 'fa'));
    };

    return (
        <AppContext.Provider value={{ locale, toggleLocale }}>
            {children}
        </AppContext.Provider>
    );
}
