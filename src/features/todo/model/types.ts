export type Task = {
    id: number;
    text: string;
    completed: boolean;
    category?: string;
};

export type Filter = "all" | "completed" | "incomplete";
