export type Task = {
    id: number;
    text: string;
    completed: boolean;
    category?: string;
    dueDate?: string;
};

export type Filter = "all" | "completed" | "incomplete";
