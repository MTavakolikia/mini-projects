import { useAppContext } from '@/context/useAppContext';
import { ClientOnly, IconButton, Skeleton } from '@chakra-ui/react';
import { LuMoon, LuSun } from 'react-icons/lu';

const ThemeToggler = () => {
    const { toggleTheme, theme } = useAppContext();
    return (
        <ClientOnly fallback={<Skeleton boxSize="8" />}>
            <IconButton onClick={toggleTheme} variant="outline" size="md" >
                {theme === "light" ? <LuSun /> : <LuMoon />}
            </IconButton>
        </ClientOnly>
    )
}

export default ThemeToggler