import type { Task } from "../model/types";
import { TaskItem } from "./TaskItem";

interface Props {
    tasks: Task[];
    onToggle: (id: number) => void;
    onDelete: (id: number) => void;
    onEditStart: (task: Task) => void;
    onEditSave: (id: number, text: string) => void;
    editingId: number | null;
    editingText: string;
    setEditingText: (text: string) => void;
    onCancelEdit: () => void;
}

export const TaskList = (props: Props) => {
    return (
        <ul className="space-y-2">
            {props.tasks.map((task) => (
                <TaskItem key={task.id} task={task} {...props} />
            ))}
        </ul>
    );
};
