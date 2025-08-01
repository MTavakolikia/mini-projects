import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, CloseButton, Dialog, Field, HStack, NativeSelect, Portal, VStack } from "@chakra-ui/react";
import { FormInput } from "@/components/form/FormInput";
// import { FormSelect } from "@/components/form/FormSelect";
import { FormDatePicker } from "@/components/form/FormDatePicker";
import { useTranslation } from "react-i18next";
import { useMemo } from "react";
import { buildTodoSchema, type TodoFormSchema } from "../validation/addTodoSchema";
import { PiPlus } from "react-icons/pi";
import { toaster } from "@/components/ui/toaster";

interface Props {
    onAdd: (text: string, category: string, dueDate: string) => void;
}
const AddTaskDialog = ({ onAdd }: Props) => {
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

    const { control, handleSubmit, reset,
        formState: { errors }, register } = useForm<TodoFormSchema>({
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
        toaster.create({
            title: t("todo.addSuccessful"),
            type: "success",
            closable: true,
            duration: 2000
        })
        reset();
    };
    return (
        <Dialog.Root placement={"center"}>
            <Dialog.Trigger asChild>
                <Button variant="outline" size="sm">
                    <PiPlus />
                    {t("todo.newTask")}
                </Button>
            </Dialog.Trigger>
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content>
                        <Dialog.Header pt={3}>
                            <Dialog.Title>{t("todo.newTask")}</Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body>
                            <form onSubmit={handleSubmit(onSubmit)} id="new-task-form">
                                <VStack gap={4}>
                                    <FormInput
                                        name="TextField"
                                        control={control}
                                        label={t("todo.taskTitle")}
                                        placeholder={t("todo.taskPlaceholder")}
                                    />
                                    <HStack w={"full"}>
                                        <FormDatePicker
                                            name="DueDate"
                                            control={control}
                                            label={t("todo.dueDate")}
                                            placeholder={t("todo.dueDate")}
                                        />
                                        <Field.Root invalid={!!errors.Category}>
                                            <Field.Label>{t("todo.category")}</Field.Label>
                                            <NativeSelect.Root size="md">
                                                <NativeSelect.Field
                                                    placeholder="Select Category"
                                                    {...register("Category")}
                                                >
                                                    {categoryOptions.map(item => <option key={item.value} value={item.value}>{item.label}</option>)}
                                                </NativeSelect.Field>
                                                <NativeSelect.Indicator />
                                            </NativeSelect.Root>
                                            <Field.ErrorText>{errors.Category?.message}</Field.ErrorText>
                                        </Field.Root>

                                    </HStack>
                                </VStack>
                            </form>
                        </Dialog.Body>
                        <Dialog.Footer>
                            <Dialog.ActionTrigger asChild>
                                <Button variant="outline">{t("common.close")}</Button>
                            </Dialog.ActionTrigger>
                            <Button
                                type="submit"
                                bg="cyan.500"
                                color="white"
                                px={4}
                                py={2}
                                alignSelf={"end"}
                                _hover={{ bg: "cyan.600" }}
                                form="new-task-form"
                            >
                                {t("todo.addTask")}
                            </Button>
                        </Dialog.Footer>
                        <Dialog.CloseTrigger asChild>
                            <CloseButton size="sm" />
                        </Dialog.CloseTrigger>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    )
}

export default AddTaskDialog