import z from "zod/v3";

export const buildTodoSchema = (t: (key: string) => string) =>
    z.object({
        TextField: z.string().min(1, { message: t("form.required") }),
        Category: z.enum(["public", "work", "personal", "learning"], {
            errorMap: () => ({ message: t("form.invalidCategory") }),
        }),
        DueDate: z.string().optional(),
    });

export type TodoFormSchema = z.infer<ReturnType<typeof buildTodoSchema>>;
