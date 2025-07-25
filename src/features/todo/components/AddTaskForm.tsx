import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, HStack } from "@chakra-ui/react";
import { FormInput } from "@/components/form/FormInput";
import { FormSelect } from "@/components/form/FormSelect";
import { FormDatePicker } from "@/components/form/FormDatePicker";
import { useTranslation } from "react-i18next";
import { useMemo } from "react";
import { buildTodoSchema, type TodoFormSchema } from "../validation/addTodoSchema";

interface Props {
    onAdd: (text: string, category: string, dueDate: string) => void;
}

export const AddTaskForm = ({ onAdd }: Props) => {
    const { t } = useTranslation();

    const formSchema = useMemo(() => buildTodoSchema(t), [t]);
    const categoryOptions = useMemo(
        () => [
            { label: t("category.public"), value: "public" },
            { label: t("category.work"), value: "work" },
            { label: t("category.personal"), value: "personal" },
            { label: t("category.learning"), value: "learning" },
        ],
        [t]
    );

    const { control, handleSubmit, reset } = useForm<TodoFormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            TextField: "",
            Category: "public",
            DueDate: "",
        },
    });

    const onSubmit = (data: TodoFormSchema) => {
        const dueDate = data.DueDate ?? "";
        onAdd(data.TextField, data.Category, dueDate);
        reset();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <HStack marginBottom={"5"}>
                <FormInput
                    name="TextField"
                    control={control}
                    label={t("todo.taskTitle")}
                    placeholder={t("todo.taskPlaceholder")}
                />

                <FormSelect
                    name="Category"
                    control={control}
                    label={t("todo.category")}
                    options={categoryOptions}
                />

                <FormDatePicker
                    name="DueDate"
                    control={control}
                    label={t("todo.dueDate")}
                    placeholder={t("todo.dueDate")}
                />

                <Button
                    type="submit"
                    bg="blue.500"
                    color="white"
                    px={4}
                    py={2}
                    rounded="xl"
                    _hover={{ bg: "blue.600" }}
                >
                    {t("todo.addTask")}
                </Button>
            </HStack>
        </form>
    );
};
