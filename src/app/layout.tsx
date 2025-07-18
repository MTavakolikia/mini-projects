import { Link, Outlet } from "react-router-dom";
import Logo from "/logo.webp"
import { useAppContext } from "../context/useAppContext";

export default function AppLayout() {
    const { toggleTheme, theme, locale, toggleLocale } = useAppContext();
    return (
        <div className="min-h-screen bg-gray-100">
            <header className="bg-white shadow p-4 flex justify-between items-center">
                <div className="flex items-center gap-2 justify-center">
                    <img src={Logo} alt="Mini app logo" width={40} />
                    <h1 className="text-xl font-bold text-cyan-600">Mini Apps</h1>
                </div>
                <nav className="space-x-4 text-sm">
                    <Link to="/" className="hover:text-blue-500" >خانه </Link>
                    <Link to="/todo" className="hover:text-blue-500">لیست کارها </Link>
                </nav>
                <div>
                    <button onClick={toggleTheme} className="hover:text-blue-500">
                        {theme === "dark" ? "☀️ روشن" : "🌙 تاریک"}
                    </button>
                    <button onClick={toggleLocale} className="hover:text-blue-500">
                        {locale === "fa" ? "EN" : "FA"}
                    </button>
                </div>

            </header>

            <main className="p-4 flex justify-center items-center">
                <Outlet />
            </main>
        </div>
    );
}
