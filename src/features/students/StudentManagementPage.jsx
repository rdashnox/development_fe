import { Box, Typography, CircularProgress } from "@mui/material";
import { useAuth } from "../../hooks/useAuth";
import { useStudents } from "./hooks/useStudents";
import StudentTable from "./components/StudentTable";

export default function StudentManagementPage() {
  const { user } = useAuth();
  const { data: students, isLoading, error } = useStudents();

  if (!['administrator', 'internship_coordinator'].includes(user?.role)) {
    return <Typography color="error">Access denied.</Typography>;
  }

  if (isLoading) return <CircularProgress />;
  if (error) return <Typography color="error">Error loading student records.</Typography>;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" fontWeight={600} sx={{ mb: 3 }}>
        Student Management
      </Typography>
      <StudentTable data={students} />
    </Box>
  );
}
