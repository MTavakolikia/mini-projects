import { Link } from "react-router-dom";
import {
    Flex,
    Box,
} from "@chakra-ui/react";

export const Navigation = () => {
    const navLinks = [
        { to: "/", label: "خانه" },
        { to: "/todo", label: "لیست کارها" },
    ];
    return (
        <Box as="nav">
            <Flex
                align="center"
                justify="space-between"
                maxW="1200px"
                mx="auto"
                direction="row-reverse"
            >
                <Flex gap={4} display={{ base: "none", md: "flex" }}>
                    {navLinks.map((link) => (
                        <Link
                            key={link.to}
                            to={link.to}
                        >
                            {link.label}
                        </Link>
                    ))}
                </Flex>
            </Flex>
        </Box>
    );
};
