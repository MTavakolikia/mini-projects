import { Controller, type Control, type FieldValues, type Path } from "react-hook-form";
import { Input, Field } from "@chakra-ui/react";

interface Props<T extends FieldValues> {
    name: Path<T>;
    control: Control<T>;
    label?: string;
    placeholder?: string;
}

export const FormInput = <T extends FieldValues>({
    name,
    control,
    label,
    placeholder,
}: Props<T>) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => (
                <Field.Root invalid={!!fieldState.error}>
                    {label && <Field.Label>{label}</Field.Label>}
                    <Input {...field} placeholder={placeholder} />
                    <Field.ErrorText>{fieldState.error?.message}</Field.ErrorText>
                </Field.Root>
            )}
        />
    );
};