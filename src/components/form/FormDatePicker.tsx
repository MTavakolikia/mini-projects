import { Field, InputGroup, Input } from "@chakra-ui/react";
import DatePicker, { DateObject } from "react-multi-date-picker";
import { Controller, type Control, type FieldValues, type Path } from "react-hook-form";
import { useAppContext } from "@/context/useAppContext";
import { getCalendarConfig } from "@/utils/calendarConfig";

interface Props<T extends FieldValues> {
    name: Path<T>;
    control: Control<T>;
    label?: string;
    placeholder?: string;
}

export const FormDatePicker = <T extends FieldValues>({
    name,
    control,
    label,
    placeholder = "لطفا تاریخ را انتخاب کنید",
}: Props<T>) => {
    const { locale } = useAppContext();
    const { calendar, dateLocale } = getCalendarConfig(locale);

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => (
                <Field.Root invalid={!!fieldState.error}>
                    {label && <Field.Label>{label}</Field.Label>}
                    <InputGroup>
                        <DatePicker
                            value={field.value || ""}
                            onChange={(date: DateObject | DateObject[] | null) => {
                                const value = Array.isArray(date) ? date[0]?.toString() : date?.toString() || "";
                                field.onChange(value);
                            }}
                            calendar={calendar}
                            locale={dateLocale}
                            format="YYYY/MM/DD"
                            render={(value: string, openCalendar: () => void) => (
                                <Input
                                    value={value}
                                    onClick={openCalendar}
                                    placeholder={placeholder}
                                />
                            )}
                        />
                    </InputGroup>
                    <Field.ErrorText>{fieldState.error?.message}</Field.ErrorText>
                </Field.Root>
            )}
        />
    );
};