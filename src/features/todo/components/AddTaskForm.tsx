import { useState } from "react";
import { useAppContext } from "../../../context/AppContext";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import gregorian from "react-date-object/calendars/gregorian";
import persian_fa from "react-date-object/locales/persian_fa";
import gregorian_en from "react-date-object/locales/gregorian_en";
import type { DateObject } from "react-multi-date-picker";

interface Props {
    onAdd: (text: string, category: string, dueDate: string) => void;
}


export const AddTaskForm = ({ onAdd }: Props) => {
    const [input, setInput] = useState("");
    const [category, setCategory] = useState("عمومی");
    const [taskDate, setTaskDate] = useState<DateObject | null>(null);

    const { locale } = useAppContext();

    const calendar = locale === "fa" ? persian : gregorian;
    const dateLocale = locale === "fa" ? persian_fa : gregorian_en;


    const handleAdd = () => {
        if (input.trim() === "") return;
        const dueDate = taskDate?.format("YYYY/MM/DD") ?? "";
        onAdd(input, category, dueDate);
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
            <DatePicker
                value={taskDate}
                onChange={setTaskDate}
                calendar={calendar}
                locale={dateLocale}
                inputClass="w-full px-3 py-2 border rounded-xl text-sm"
                placeholder="تاریخ سررسید"
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
