import {
    Select,
    Portal,
    createListCollection,
    Field,
} from "@chakra-ui/react";
import { Controller, type Control, type FieldValues, type Path } from "react-hook-form";

interface Option {
    label: string;
    value: string;
}

interface Props<T extends FieldValues> {
    name: Path<T>;
    control: Control<T>;
    label?: string;
    placeholder?: string;
    options: Option[];
}

export const FormSelect = <T extends FieldValues>({
    name,
    control,
    label,
    options,
    placeholder,
}: Props<T>) => {
    const collection = createListCollection({ items: options });

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => (
                <Field.Root invalid={!!fieldState.error}>
                    {label && <Field.Label>{label}</Field.Label>}
                    <Select.Root
                        collection={collection}
                        value={field.value ? [field.value] : []}
                        onValueChange={({ value }) => field.onChange(value[0] || "")}
                    >
                        <Select.HiddenSelect />
                        <Select.Control>
                            <Select.Trigger>
                                <Select.ValueText placeholder={placeholder || "انتخاب کنید"} />
                            </Select.Trigger>
                            <Select.IndicatorGroup>
                                <Select.Indicator />
                            </Select.IndicatorGroup>
                        </Select.Control>
                        <Portal>
                            <Select.Positioner>
                                <Select.Content>
                                    {collection.items.map((item) => (
                                        <Select.Item key={item.value} item={item}>
                                            <Select.ItemText>{item.label}</Select.ItemText>
                                            <Select.ItemIndicator />
                                        </Select.Item>
                                    ))}
                                </Select.Content>
                            </Select.Positioner>
                        </Portal>
                    </Select.Root>
                    <Field.ErrorText>{fieldState.error?.message}</Field.ErrorText>
                </Field.Root>
            )}
        />
    );
};