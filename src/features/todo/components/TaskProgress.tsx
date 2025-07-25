import { useTranslation } from "react-i18next";

interface Props {
    completed: number;
    total: number;
}

export const TaskProgress = ({ completed, total }: Props) => {
    const { t } = useTranslation();
    const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

    return (
        <div className="mt-3 py-2">
            <p className="text-sm text-gray-600">
                ✅ {t("todo.progress.completedOfTotal", { completed, total })}
            </p>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div className="bg-green-500 h-3 transition-all duration-300" style={{ width: `${percent}%` }} />
            </div>
            <p className="text-xs text-right text-gray-500">
                {t("todo.progress.percent", { percent })}
            </p>

        </div>
    );
};
