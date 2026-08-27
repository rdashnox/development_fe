import { Box, Typography, CircularProgress, Alert } from "@mui/material";
import CardStat from "../../components/common/CardStat";
import StudentTable from "./components/StudentTable";
import { useAuth } from "../../hooks/useAuth";
import { useStudents } from "./hooks/useStudents";
import { getStudentManagementPermissions } from "./studentPermissions";

export default function StudentManagementPage() {
  const { user } = useAuth();
  const permissions = getStudentManagementPermissions(user?.role);

  const { data: students = [], isLoading, isError, error } = useStudents();

  return (
    <Box sx={{ background: "#F7F9FB", minHeight: "100vh", p: 3 }}>
      {/* Header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h5" fontWeight={600}>Student Records</Typography>
      </Box>

      {/* Stats Section */}
      <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 2, mb: 4 }}>
        <CardStat title="Total Students" value={students.length} />
        <CardStat title="Active" value={students.filter(s => s.internship_status === "active").length} />
      </Box>

      {/* Table Section */}
      {!permissions.canView ? (
        <Alert severity="error">Access denied.</Alert>
      ) : isLoading ? (
        <CircularProgress />
      ) : isError ? (
        <Alert severity="error">{error.message || "Error loading students."}</Alert>
      ) : (
        <StudentTable data={students} />
      )}
    </Box>
  );
}