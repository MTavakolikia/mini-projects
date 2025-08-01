
import { Heading, HStack, Image } from "@chakra-ui/react"
import LangToggler from "./LangToggler"
import { Navigation } from "./Navbar"
import ThemeToggler from "./ThemeToggler"
import Logo from "/logo.webp"


const Header = () => {

    return (
        <HStack as="header" justify={"space-between"} bg={"white"} p={5}>
            <HStack >
                <Image src={Logo} alt="Mini app logo" width={"40px"} height={"40px"} />
                <Heading fontWeight={"bold"} size={"2xl"} color={"cyan.500"}>Mini Apps</Heading>
            </HStack>
            <Navigation />
            <HStack >
                <ThemeToggler />
                <LangToggler />
            </HStack>
        </HStack>
    )
}

export default Header