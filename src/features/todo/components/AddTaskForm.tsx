import { useState } from "react";

interface Props {
    onAdd: (text: string, category: string) => void;
}

export const AddTaskForm = ({ onAdd }: Props) => {
    const [input, setInput] = useState("");
    const [category, setCategory] = useState("عمومی");

    const handleAdd = () => {
        if (input.trim() === "") return;
        onAdd(input, category);
        setInput("");
        setCategory("عمومی");
    };


    return (
        <div className="flex flex-col md:flex-row gap-2 mb-4">
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="کار جدید..."
                className="flex-1 px-3 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="px-3 py-2 border rounded-xl"
            >
                <option value="عمومی">🟡 عمومی</option>
                <option value="کار">🔵 کار</option>
                <option value="شخصی">🟢 شخصی</option>
                <option value="یادگیری">🟣 یادگیری</option>
            </select>
            <button
                onClick={handleAdd}
                className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600 transition"
            >
                افزودن
            </button>
        </div>

    );
};
