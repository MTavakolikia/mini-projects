import { useEffect, useState } from "react";
import { AddTaskForm } from "./components/AddTaskForm";
import { TaskFilter } from "./components/TaskFilter";
import { TaskList } from "./components/TaskList";
import { TaskProgress } from "./components/TaskProgress";
import type { Filter, Task } from "./model/types";
import { useTranslation } from "react-i18next";

export default function TodoApp() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [filter, setFilter] = useState<Filter>("all");
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editingText, setEditingText] = useState<string>("");
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [categoryFilter, setCategoryFilter] = useState<string>("all");
    const { t } = useTranslation();
    useEffect(() => {
        const storedTasks = localStorage.getItem("tasks");
        if (storedTasks) setTasks(JSON.parse(storedTasks));
    }, []);

    const handlePersistTasks = (newTasks: Task[]) => {
        localStorage.setItem("tasks", JSON.stringify(newTasks));
    }

    const handleAddTask = (text: string, category: string, dueDate: string) => {
        const newTask: Task = {
            id: Date.now(),
            text,
            completed: false,
            category,
            dueDate
        };
        const newTaskList = [newTask, ...tasks]
        setTasks(newTaskList);
        handlePersistTasks(newTaskList);
    };

    const handleToggleComplete = (id: number) => {
        const taskChanges = tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
        setTasks(taskChanges)
        handlePersistTasks(taskChanges)
    };

    const handleDeleteTask = (id: number) => {
        setTasks((prev) => prev.filter((t) => t.id !== id));
    };

    const handleStartEdit = (task: Task) => {
        setEditingId(task.id);
        setEditingText(task.text);
    };

    const handleEditSave = (id: number, text: string) => {
        if (text.trim() === "") {
            setEditingId(null);
            return;
        }
        setTasks((prev) =>
            prev.map((t) => (t.id === id ? { ...t, text } : t))
        );
        setEditingId(null);
    };

    const handleCancelEdit = () => {
        setEditingId(null);
    };

    const getFilteredTasks = () => {
        let filtered = tasks;

        if (filter === "completed") {
            filtered = filtered.filter((t) => t.completed);
        } else if (filter === "incomplete") {
            filtered = filtered.filter((t) => !t.completed);
        }

        if (categoryFilter !== "all") {
            filtered = filtered.filter((t) => t.category === categoryFilter);
        }

        if (searchQuery.trim() !== "") {
            filtered = filtered.filter((t) =>
                t.text.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        return filtered;
    };


    const total = tasks.length;
    const completed = tasks.filter((t) => t.completed).length;

    return (
        <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-2xl">
            <h1 className="text-2xl font-bold mb-4 text-center">📝 {t("todo.title")}</h1>

            <AddTaskForm onAdd={handleAddTask} />

            <div className="flex  md:flex-row items-center justify-between gap-2 mb-4">
                <input
                    type="text"
                    placeholder={t("todo.search")}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full md:w-1/2 px-3 py-2 border border-gray-300 rounded shadow-sm text-sm"
                />
                <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded text-sm"
                >
                    <option value="all">{t("todo.allCategories")}</option>
                    <option value="public">{t("category.public")}</option>
                    <option value="work">{t("category.work")}</option>
                    <option value="learning">{t("category.learning")}</option>
                </select>
                <TaskFilter filter={filter} onChange={setFilter} />
            </div>

            {total === 0 ? (
                <p className="text-sm text-gray-500 italic">{t("todo.noTasks")}</p>
            ) : (
                <TaskList
                    tasks={getFilteredTasks()}
                    onToggle={handleToggleComplete}
                    onDelete={handleDeleteTask}
                    onEditStart={handleStartEdit}
                    onEditSave={handleEditSave}
                    editingId={editingId}
                    editingText={editingText}
                    setEditingText={setEditingText}
                    onCancelEdit={handleCancelEdit}
                />
            )}
            <TaskProgress completed={completed} total={total} />
        </div>
    );
}
