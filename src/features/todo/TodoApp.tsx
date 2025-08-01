import { useEffect, useState } from "react";
import { AddTaskForm } from "./components/AddTaskForm";
import { TaskFilter } from "./components/TaskFilter";
import { TaskList } from "./components/TaskList";
import { TaskProgress } from "./components/TaskProgress";
import type { Filter, Task } from "./model/types";
import { useTranslation } from "react-i18next";
import { Badge, Container, Heading, HStack, Input, NativeSelect } from "@chakra-ui/react";

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
        <Container as="section" shadow={"md"} rounded={"md"} bg={"white"} _dark={{ bg: "black" }} p={"8"}>
            <Heading textAlign={"center"} size="3xl"> 📝 {t("todo.title")}</Heading>
            <AddTaskForm onAdd={handleAddTask} />
            <HStack>
                <Input placeholder={t("todo.search")}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)} size="sm" />
                <NativeSelect.Root size={"md"}>
                    <NativeSelect.Field value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                    >
                        <option value="all">{t("todo.allCategories")}</option>
                        <option value="public">{t("category.public")}</option>
                        <option value="work">{t("category.work")}</option>
                        <option value="learning">{t("category.learning")}</option>
                    </NativeSelect.Field>
                    <NativeSelect.Indicator />
                </NativeSelect.Root>
                <TaskFilter filter={filter} onChange={setFilter} />
            </HStack>

            {
                total === 0 ? (
                    <Badge colorPalette="purple">{t("todo.noTasks")}</Badge>
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
                )
            }
            <TaskProgress completed={completed} total={total} />
        </Container >
    );
}
