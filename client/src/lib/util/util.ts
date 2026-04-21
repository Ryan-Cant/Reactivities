import { format, type DateArg } from "date-fns";

export function formatDate(date: DateArg<Date>) {
    return format(date, 'dd MMM yyyy h:mm a');
}



export const categoryOptions = [
    { value: "drinks", label: "Drinks" },
    { value: "culture", label: "Culture" },
    { value: "film", label: "Film" },
    { value: "food", label: "Food" },
    { value: "music", label: "Music" },
    { value: "travel", label: "Travel" },
];