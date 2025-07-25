import { useTranslation } from "react-i18next";
import type { Filter } from "../model/types";

interface Props {
    filter: Filter;
    onChange: (f: Filter) => void;
}

export const TaskFilter = ({ filter, onChange }: Props) => {
    const { t } = useTranslation();

    return (
        <select
            value={filter}
            onChange={(e) => onChange(e.target.value as Filter)}
            className="px-3 py-2 border border-gray-300 rounded text-sm"
        >
            <option value="all">{t("todo.all")}</option>
            <option value="completed">{t("todo.completed")}</option>
            <option value="incomplete">{t("todo.incomplete")}</option>
        </select>
    );
};
