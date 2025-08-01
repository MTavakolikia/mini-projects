import { useContext } from 'react';
import { AppContext } from '@/context/AppContext';
import { MdGTranslate } from 'react-icons/md';
import { IconButton } from '@chakra-ui/react';
import { Tooltip } from '../ui/tooltip';

export default function LanguageSwitcher() {
    const { locale, toggleLocale } = useContext(AppContext);

    return (
        <Tooltip content={locale ? locale === 'en' ? 'فارسی' : 'English' : "English"}>
            <IconButton onClick={toggleLocale} size={"sm"}>
                <MdGTranslate />
            </IconButton>
        </Tooltip>
    );
}
