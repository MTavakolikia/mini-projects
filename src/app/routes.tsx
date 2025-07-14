import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import TodoApp from "../features/todo/TodoApp";
import AppLayout from "./layout";

export default function AppRoutes() {
    return (
        <Routes>
            <Route element={<AppLayout />} >
                <Route path="/" element={<Home />} />
                <Route path="/todo" element={<TodoApp />} />
            </Route>
        </Routes>
    );
}
