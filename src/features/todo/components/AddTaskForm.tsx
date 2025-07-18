import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Flex, Button } from "@chakra-ui/react";
import { FormInput } from "@/components/form/FormInput";
import { FormSelect } from "@/components/form/FormSelect";
import { FormDatePicker } from "@/components/form/FormDatePicker";
import z from "zod/v3";

const formSchema = z.object({
    TextField: z.string().min(1, { message: "عنوان کار الزامی است" }),
    Category: z.enum(["عمومی", "کار", "شخصی", "یادگیری"], {
        errorMap: () => ({
            message: "لطفا یک دسته‌بندی معتبر انتخاب کنید",
        }),
    }),
    DueDate: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

interface Props {
    onAdd: (text: string, category: string, dueDate: string) => void;
}

const categoryOptions = [
    { label: "🟡 عمومی", value: "عمومی" },
    { label: "🔵 کار", value: "کار" },
    { label: "🟢 شخصی", value: "شخصی" },
    { label: "🟣 یادگیری", value: "یادگیری" },
];

export const AddTaskForm = ({ onAdd }: Props) => {


    const { control, handleSubmit, reset } = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            TextField: "",
            Category: "عمومی",
            DueDate: "",
        },
    });

    const onSubmit = (data: FormData) => {
        const dueDate = data.DueDate ?? "";
        onAdd(data.TextField, data.Category, dueDate);
        reset();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Flex direction={{ base: "column", md: "row" }} gap={4} mb={6}>

                <FormInput
                    name="TextField"
                    control={control}
                    label="عنوان کار"
                    placeholder="کار جدید..."
                />

                <FormSelect
                    name="Category"
                    control={control}
                    label="دسته‌بندی"
                    placeholder="دسته‌بندی را انتخاب کنید"
                    options={categoryOptions}
                />

                <FormDatePicker
                    name="DueDate"
                    control={control}
                    label="تاریخ سررسید"
                    placeholder="تاریخ سررسید"
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
                    افزودن
                </Button>
            </Flex>
        </form>
    );
};