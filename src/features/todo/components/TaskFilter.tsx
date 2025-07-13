import type { Filter } from "../model/types";

interface Props {
    filter: Filter;
    onChange: (f: Filter) => void;
}

export const TaskFilter = ({ filter, onChange }: Props) => {
    return (
        <select
            value={filter}
            onChange={(e) => onChange(e.target.value as Filter)}
            className="px-3 py-2 border border-gray-300 rounded text-sm mb-4"
        >
            <option value="all">همه</option>
            <option value="completed">انجام‌شده</option>
            <option value="incomplete">انجام‌نشده</option>
        </select>
    );
};
