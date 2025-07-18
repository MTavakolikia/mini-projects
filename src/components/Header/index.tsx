
import LangToggler from "./LangToggler"
import { Navigation } from "./Navbar"
import ThemeToggler from "./ThemeToggler"
import Logo from "/logo.webp"


const Header = () => {

    return (
        <header className="bg-white shadow p-4 flex justify-between items-center">
            <div className="flex items-center gap-2 justify-center">
                <img src={Logo} alt="Mini app logo" width={40} />
                <h1 className="text-xl font-bold text-cyan-600">Mini Apps</h1>
            </div>

            <Navigation />
            <div className="flex gap-2">
                <ThemeToggler />
                <LangToggler />
            </div>

        </header>
    )
}

export default Header