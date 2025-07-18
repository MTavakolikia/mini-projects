
import { Link, } from "react-router-dom";
import Logo from "/logo.webp"
import ThemeToggler from "./ThemeToggler";
import LangToggler from "./LangToggler";

const Header = () => {

    return (
        <header className="bg-white shadow p-4 flex justify-between items-center">
            <div className="flex items-center gap-2 justify-center">
                <img src={Logo} alt="Mini app logo" width={40} />
                <h1 className="text-xl font-bold text-cyan-600">Mini Apps</h1>
            </div>
            <nav className="space-x-4 text-sm">
                <Link to="/" className="hover:text-blue-500" >خانه </Link>
                <Link to="/todo" className="hover:text-blue-500">لیست کارها </Link>
            </nav>
            <div className="flex gap-2">
                <ThemeToggler />
                <LangToggler />
            </div>

        </header>
    )
}

export default Header