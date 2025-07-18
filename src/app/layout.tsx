import Header from "@/components/Header";
import { Outlet } from "react-router-dom";


export default function AppLayout() {
    return (
        <div className="min-h-screen bg-gray-100">
            <Header />

            <main className="p-4 flex justify-center items-center">
                <Outlet />
            </main>
        </div>
    );
}
