interface Props {
    completed: number;
    total: number;
}

export const TaskProgress = ({ completed, total }: Props) => {
    const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

    return (
        <div className="mt-3 py-2">
            <p className="text-sm text-gray-600">
                ✅ {completed} از {total} تسک انجام شده
            </p>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div className="bg-green-500 h-3 transition-all duration-300" style={{ width: `${percent}%` }} />
            </div>
            <p className="text-xs text-right text-gray-500">{percent}% پیشرفت</p>
        </div>
    );
};
