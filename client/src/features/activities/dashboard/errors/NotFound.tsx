import { SearchOff } from "@mui/icons-material";
import { Typography, Button, Paper } from "@mui/material";
import { Link } from "react-router";

export default function NotFound() {
    return (
        <Paper
            sx={{
                height: 400,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                p: 6
            }}
        >
            <SearchOff sx={{ fontSize: 100 }} color="primary" />
        <Typography gutterBottom variant="h3">
            Oops - we've looked everywhere but we couldn't find this.
        </Typography>
        <Button fullWidth component={Link} to='/activities'>
        Return to the activities page
        </Button>
        </Paper>
    )
}
