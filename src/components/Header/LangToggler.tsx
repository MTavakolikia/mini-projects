import { useAppContext } from "@/context/useAppContext";
import { IconButton } from "@chakra-ui/react";

const LangToggler = () => {
    const { locale, toggleLocale } = useAppContext();

    return (
        <IconButton
            onClick={toggleLocale}
        >
            {locale === "fa" ? "EN" : "FA"}
        </IconButton>
    )
}

export default LangToggler