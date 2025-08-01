import { Badge, Checkbox, HStack, IconButton, Input, Span } from "@chakra-ui/react";
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
        <HStack justifyContent={"space-between"} my={1} p={2} rounded={"md"} shadow={"sm"}>
            <HStack>
                <Checkbox.Root
                    checked={task.completed}
                    onChange={() => onToggle(task.id)}
                    variant={"subtle"}
                >
                    <Checkbox.HiddenInput />
                    <Checkbox.Control />
                </Checkbox.Root>
                {editingId === task.id ? (
                    <Input value={editingText}
                        onChange={(e) => setEditingText(e.target.value)}
                        onBlur={() => onEditSave(task.id, editingText)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") onEditSave(task.id, editingText);
                            if (e.key === "Escape") onCancelEdit();
                        }}
                        autoFocus size="sm" />
                ) : (
                    <HStack>
                        <Span
                            onClick={() => onEditStart(task)}
                            textDecoration={task.completed ? "line-through" : ""}
                            color={task.completed ? "gray.200" : "gray.900"}
                            cursor={"pointer"}
                        >
                            {task.text}
                        </Span>
                        {task.category && (
                            <Badge color="gray.400" rounded={"lg"}> {task.category}</Badge>

                        )}
                        {task?.dueDate && (
                            <Span fontSize={"sm"} color="gray.600">
                                سررسید: {task.dueDate}
                            </Span>
                        )}
                    </HStack>
                )}
            </HStack>
            <HStack >
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
            </HStack>
        </HStack>
    );
};
