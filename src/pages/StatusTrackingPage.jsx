import { Box, Typography, CircularProgress } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { statusApi } from "../api/status";
import StatusTable from "../components/StatusTable";

export default function StatusTrackingPage() {
  const { data: statusRecords, isLoading, error } = useQuery({
    queryKey: ["statusRecords"],
    queryFn: statusApi.listStatus,
  });

  if (isLoading) return <CircularProgress />;
  if (error) return <Typography color="error">Error loading status records.</Typography>;

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h5" fontWeight={600}>Status Tracking</Typography>
      </Box>

      <StatusTable data={statusRecords} />
    </Box>
  );
}
