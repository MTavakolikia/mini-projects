import { useTranslation } from "react-i18next";
import type { Filter } from "../model/types";
import { NativeSelect } from "@chakra-ui/react";

interface Props {
    filter: Filter;
    onChange: (f: Filter) => void;
}

export const TaskFilter = ({ filter, onChange }: Props) => {
    const { t } = useTranslation();

    return (
        <NativeSelect.Root size={"md"}>
            <NativeSelect.Field value={filter}
                onChange={(e) => onChange(e.target.value as Filter)}
            >
                <option value="all">{t("todo.all")}</option>
                <option value="completed">{t("todo.completed")}</option>
                <option value="incomplete">{t("todo.incomplete")}</option>
            </NativeSelect.Field>
            <NativeSelect.Indicator />
        </NativeSelect.Root>
    );
};
