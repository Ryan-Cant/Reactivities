import {  Grid, Box, Typography } from "@mui/material";
import { useParams } from "react-router";
import { useActivities } from "../../../../lib/hooks/useActivities";
import ActivityDetailHeader from "./ActivityDetailHeader";
import ActivityDetailInfo from "./ActivityDetailInfo";
import ActivityDetailChat from "./ActivityDetailChat";
import ActivityDetailsSidebar from "./ActivityDetailsSidebar";
import MapComponent from "../../../../app/shared/components/MapComponent";


export default function ActivityDetailPage() {


  const { id } = useParams();
  const { activity, isLoadingActivity } = useActivities(id);

  if (isLoadingActivity) return <Typography>Loading...</Typography>;
  if (!activity) return <Typography>Activity not found</Typography>;

  return (
    <Grid container spacing={3}>
      <Grid size={8}>
        <ActivityDetailHeader activity={activity} />
        <ActivityDetailInfo activity={activity} />
        <Box sx={{ mb: 2, height: 400 }}>
          <MapComponent 
            position={[activity.latitude, activity.longitude]}
            venue={activity.venue}
          />
        </Box>
        <ActivityDetailChat />

      </Grid>
      <Grid size={4}>
        <ActivityDetailsSidebar />
      </Grid>
    </Grid>

  )
}