import { useState } from "react";

type Task = {
    id: number;
    text: string;
    completed: boolean;
};
type Filter = "all" | "completed" | "incomplete";

export default function TodoApp() {
    const [task, setTask] = useState<string>("");
    const [tasks, setTasks] = useState<Task[]>([]);
    const [filter, setFilter] = useState<Filter>("all");

    const handleAddTask = () => {
        if (task.trim() === "") return;
        const newTask: Task = {
            id: Date.now(),
            text: task,
            completed: false,
        };
        setTasks([newTask, ...tasks]);
        setTask("");
    };

    const getFilteredTasks = () => {
        switch (filter) {
            case "completed":
                return tasks.filter((t) => t.completed);
            case "incomplete":
                return tasks.filter((t) => !t.completed);
            default:
                return tasks;
        }
    };


    const handleToggleComplete = (id: number) => {
        setTasks((prev) =>
            prev.map((task) =>
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        );
    };

    const handleDeleteTask = (id: number) => {
        setTasks((prev) => prev.filter((task) => task.id !== id));
    };


    return (
        <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-md">
            <h1 className="text-2xl font-bold mb-4 text-center">📝 لیست کارها</h1>

            <div className="flex gap-2 mb-4">
                <input
                    type="text"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    placeholder="کار جدید..."
                    className="flex-1 px-3 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button
                    onClick={handleAddTask}
                    className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600 transition"
                >
                    افزودن
                </button>
            </div>

            <div className="flex justify-center gap-2 mb-4">
                {(["all", "completed", "incomplete"] as Filter[]).map((f) => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`px-3 py-1 rounded-full text-sm border transition ${filter === f
                            ? "bg-blue-500 text-white"
                            : "bg-white text-gray-700 border-gray-300"
                            }`}
                    >
                        {f === "all"
                            ? "همه"
                            : f === "completed"
                                ? "انجام‌شده"
                                : "انجام‌نشده"}
                    </button>
                ))}
            </div>


            <ul className="space-y-2">
                {getFilteredTasks().map((t) => (
                    <li
                        key={t.id}
                        className="flex justify-between items-center bg-gray-100 px-4 py-2 rounded-xl"
                    >
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={t.completed}
                                onChange={() => handleToggleComplete(t.id)}
                                className="w-4 h-4"
                            />
                            <span
                                className={`${t.completed ? "line-through text-gray-400" : ""
                                    } transition-all`}
                            >
                                {t.text}
                            </span>
                        </div>
                        <button
                            onClick={() => handleDeleteTask(t.id)}
                            className="text-red-500 hover:text-red-700 transition"
                        >
                            ❌
                        </button>
                    </li>
                ))}
            </ul>

        </div>
    );
}
