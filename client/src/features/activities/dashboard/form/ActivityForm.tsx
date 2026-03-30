import { Alert, Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useActivities } from "../../../../lib/hooks/useActivities";
import { useNavigate, useParams } from "react-router";

function toDateInputValue(date?: string) {
    if (!date) return "";
    return date.split("T")[0] ?? "";
}



export default function ActivityForm() {
    const { id } = useParams();
    const { createActivity, updateActivity, activity, isLoadingActivity } = useActivities(id);
    const [submitError, setSubmitError] = useState<string | null>(null);

    const saving = createActivity.isPending || updateActivity.isPending;
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSubmitError(null);

        const formData = new FormData(event.currentTarget);
        const data: { [key: string]: FormDataEntryValue } = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });


        if (activity) {
            data.id = activity.id;
            await updateActivity.mutate(data as unknown as Activity);
            navigate(`/activities/${activity.id}`);
        } else {
             createActivity.mutate(data as unknown as Activity , {
                onSuccess: (id) => {
                    navigate(`/activities/${id}`);
                }
            });

        }
    };
    if (isLoadingActivity) return <Typography>Loading activity...</Typography>;
    return (
        <Paper sx={{ borderRadius: 3, padding: 3 }}>
            <Typography variant="h5" gutterBottom color="primary">
                {activity ? "Edit activity" : "Create activity"}
            </Typography>
            <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={3}>
                {submitError && <Alert severity="error">{submitError}</Alert>}
                <TextField name="title" label="Title" defaultValue={activity?.title} />
                <TextField name="description" label="Description" defaultValue={activity?.description} multiline rows={3} />
                <TextField name="category" label="Category" defaultValue={activity?.category} />
                <TextField
                    name="date"
                    label="Date"
                    type="date"
                    defaultValue={toDateInputValue(activity?.date)}
                    slotProps={{ inputLabel: { shrink: true } }}
                />
                <TextField name="city" label="City" defaultValue={activity?.city} />
                <TextField name="venue" label="Venue" defaultValue={activity?.venue} />
                <Box display="flex" justifyContent="end" gap={3}>
                    <Button color="inherit" disabled={saving}>
                        Cancel
                    </Button>
                    <Button type="submit" variant="contained" color="success" disabled={saving}>
                        Submit
                    </Button>
                </Box>
            </Box>
        </Paper>
    );
}
