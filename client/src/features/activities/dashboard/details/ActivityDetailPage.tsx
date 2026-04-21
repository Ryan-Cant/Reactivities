import { Box, Grid, Typography } from "@mui/material";
import { useParams } from "react-router";
import { useActivities } from "../../../../lib/hooks/useActivities";
import ActivityDetailHeader from "./ActivityDetailHeader";
import ActivityDetailInfo from "./ActivityDetailInfo";
import ActivityDetailChat from "./ActivityDetailChat";
import ActivityDetailsSidebar from "./ActivityDetailsSidebar";
import AppMap from "../../../../app/shared/components/AppMap";


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
        <Box sx={{ mb: 2 }}>
          <AppMap 
            latitude={activity.latitude} 
            longitude={activity.longitude} 
            markerTitle={activity.venue}
            height={400}
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