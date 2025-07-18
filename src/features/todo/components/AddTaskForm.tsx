import { useState } from "react";
import DatePicker from "react-multi-date-picker";
import { getCalendarConfig } from "../../../utils/calendarConfig";

import type { DateObject } from "react-multi-date-picker";
import { useAppContext } from "../../../context/useAppContext";
interface Props {
    onAdd: (text: string, category: string, dueDate: string) => void;
}


export const AddTaskForm = ({ onAdd }: Props) => {
    const [input, setInput] = useState("");
    const [category, setCategory] = useState("عمومی");
    const [taskDate, setTaskDate] = useState<DateObject | null>(null);

    const { locale } = useAppContext();
    const { calendar, dateLocale } = getCalendarConfig(locale);



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
