import Header from "@/components/Header";
import { Box, HStack } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { Outlet } from "react-router-dom";


export default function AppLayout() {
    const { i18n } = useTranslation();
    const fontFamily = i18n.language === 'fa' ? "'Vazir', sans-serif" : "'Roboto', sans-serif";
    return (
        <Box as={"section"} h={"dvh"} bg={"gray.100"} _dark={{ bg: "gray.900" }}   fontFamily={fontFamily} >
            <Header />
            <HStack as="main" p={4} >
                <Outlet />
            </HStack>
        </Box>
    );
}
