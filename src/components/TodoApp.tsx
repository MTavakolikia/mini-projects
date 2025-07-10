import { useState } from "react";

type Task = {
    id: number;
    text: string;
    completed: boolean;
};

export default function TodoApp() {
    const [task, setTask] = useState<string>("");
    const [tasks, setTasks] = useState<Task[]>([]);

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

            <ul className="space-y-2">
                {tasks.map((t) => (
                    <li
                        key={t.id}
                        className="flex justify-between items-center bg-gray-100 px-4 py-2 rounded-xl"
                    >
                        <span>{t.text}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
