import { DateTimePicker, type DateTimePickerProps } from "@mui/x-date-pickers";
import { useController, type FieldValues, type UseControllerProps } from "react-hook-form";

type Props<T extends FieldValues> =
    {} & UseControllerProps<T> & Partial<DateTimePickerProps>;

export default function DateTimeInput<T extends FieldValues>
    (props: Props<T>) {
    const { field, fieldState } = useController({ ...props });
    return (
        <DateTimePicker
            {...props}
            value={field.value ?? null}
            onChange={(value) => field.onChange(value ?? null)}
            sx={{ width: "100%" }}
            slotProps={{
                textField: {
                    onBlur: field.onBlur,
                    error: !!fieldState.error,
                    helperText: fieldState.error?.message
                }
            }}
        />
    );
}
