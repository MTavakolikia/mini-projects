import { useState } from "react";

interface Props {
    onAdd: (text: string) => void;
}

export const AddTaskForm = ({ onAdd }: Props) => {
    const [input, setInput] = useState("");

    const handleAdd = () => {
        if (input.trim() === "") return;
        onAdd(input);
        setInput("");
    };

    return (
        <div className="flex gap-2 mb-4">
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="کار جدید..."
                className="flex-1 px-3 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
                onClick={handleAdd}
                className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600 transition"
            >
                افزودن
            </button>
        </div>
    );
};
