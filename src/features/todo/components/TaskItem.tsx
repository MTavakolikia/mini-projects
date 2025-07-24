import { Checkbox, IconButton } from "@chakra-ui/react";
import type { Task } from "../model/types";
import { FaPencilAlt, FaRegTrashAlt } from "react-icons/fa";
import { Tooltip } from "@/components/ui/tooltip";


interface Props {
    task: Task;
    onToggle: (id: number) => void;
    onDelete: (id: number) => void;
    onEditStart: (task: Task) => void;
    onEditSave: (id: number, newText: string) => void;
    editingId: number | null;
    editingText: string;
    setEditingText: (text: string) => void;
    onCancelEdit: () => void;
}

export const TaskItem = ({
    task,
    onToggle,
    onDelete,
    onEditStart,
    onEditSave,
    editingId,
    editingText,
    setEditingText,
    onCancelEdit,
}: Props) => {
    return (
        <li className="flex justify-between items-center bg-gray-100 px-4 py-2 rounded-xl">
            <div className="flex items-center gap-2">
                <Checkbox.Root
                    checked={task.completed}
                    onChange={() => onToggle(task.id)}
                    variant={"subtle"}
                >
                    <Checkbox.HiddenInput />
                    <Checkbox.Control />
                </Checkbox.Root>
                {editingId === task.id ? (
                    <input
                        value={editingText}
                        onChange={(e) => setEditingText(e.target.value)}
                        onBlur={() => onEditSave(task.id, editingText)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") onEditSave(task.id, editingText);
                            if (e.key === "Escape") onCancelEdit();
                        }}
                        autoFocus
                        className="px-2 py-1 rounded border border-gray-300 text-sm"
                    />
                ) : (
                    <div className="flex gap-2 items-center">
                        <span
                            className={`${task.completed ? "line-through text-gray-400" : ""} cursor-pointer`}
                            onClick={() => onEditStart(task)}
                        >
                            {task.text}
                        </span>


                        {task.category && (
                            <span className="text-xs text-gray-500 bg-gray-200 px-2 py-0.5 rounded-full">
                                {task.category}
                            </span>
                        )}
                        {task?.dueDate && (
                            <span className="text-xs text-gray-600">
                                سررسید: {task.dueDate}
                            </span>
                        )}
                    </div>

                )}
            </div>
            <div className="flex gap-2">
                <Tooltip content="ویرایش">
                    <IconButton
                        aria-label="Edit Task"
                        variant="outline"
                        size={"sm"}
                        color={"yellow.500"}
                        border={"solid 1px"}
                        _hover={{ color: "yellow.600" }}
                        onClick={() => onEditStart(task)}
                        rounded="full"
                    >
                        <FaPencilAlt />
                    </IconButton>
                </Tooltip>
                <Tooltip content="حذف">
                    <IconButton
                        aria-label="Delete Task"
                        variant="outline"
                        border={"solid 1px"}
                        size={"sm"} onClick={() => onDelete(task.id)}
                        color={"red.500"}
                        _hover={{ color: "red.600" }}
                        rounded="full"

                    >
                        <FaRegTrashAlt />
                    </IconButton>
                </Tooltip>
            </div>
        </li>
    );
};
