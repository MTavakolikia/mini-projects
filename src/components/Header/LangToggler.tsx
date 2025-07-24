import { useContext } from 'react';
import { AppContext } from '@/context/AppContext';

export default function LanguageSwitcher() {
    const { locale, toggleLocale } = useContext(AppContext);

    return (
        <button onClick={toggleLocale}>
            {locale === 'en' ? 'فارسی' : 'English'}
        </button>
    );
}
