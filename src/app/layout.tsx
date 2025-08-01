import Header from "@/components/Header";
import { Box, HStack } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";


export default function AppLayout() {
    return (
        <Box as={"section"} h={"dvh"} bg={"gray.100"} _dark={{ bg: "gray.900" }}>
            <Header />
            <HStack as="main" p={4} >
                <Outlet />
            </HStack>
        </Box>
    );
}
