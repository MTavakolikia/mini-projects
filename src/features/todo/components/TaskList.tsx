import { Stack } from "@chakra-ui/react";
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
        <Stack mt={4}>
            {props.tasks.map((task) => (
                <TaskItem key={task.id} task={task} {...props} />
            ))}
        </Stack>
    );
};
