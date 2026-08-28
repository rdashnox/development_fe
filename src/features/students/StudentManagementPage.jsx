import { Box, Typography, CircularProgress, Alert, Button } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import CardStat from "../../components/common/CardStat";
import StudentTable from "./components/StudentTable";
import StudentModal from "./components/StudentModal";
import { useAuth } from "../../hooks/useAuth";
import { useStudents } from "./hooks/useStudents";
import { useStudentMutations } from "./hooks/useStudentMutations";
import { useStudentModalState } from "./hooks/useStudentModalState";
import { getStudentManagementPermissions } from "./studentPermissions";

export default function StudentManagementPage() {
  const { user, isLoading: isAuthLoading } = useAuth();
  const { data: students, isLoading, isError, error } = useStudents();
  const modalState = useStudentModalState();
  const { onCreate, onUpdate } = useStudentMutations();
  
  const permissions = getStudentManagementPermissions(user?.role);
  const safeStudents = students || [];

  if (isAuthLoading || isLoading) return <CircularProgress />;
  if (!permissions.canView) return <Typography color="error">Access denied.</Typography>;
  if (isError) return <Alert severity="error">{error?.message || "Error loading students."}</Alert>;

  return (
    <Box sx={{ background: "#F7F9FB", minHeight: "100vh", p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h5" fontWeight={600}>Student Records</Typography>
        {permissions.canCreate && (
          <Button variant="contained" startIcon={<AddIcon />} onClick={() => modalState.open("create")}>
            Add Student
          </Button>
        )}
      </Box>

      <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 2, mb: 4 }}>
        <CardStat title="Total Students" value={safeStudents.length} />
        <CardStat title="Active" value={safeStudents.filter(s => s.internship_status === "active").length} />
      </Box>

      <StudentTable data={safeStudents} />

      <StudentModal
        open={modalState.isOpen}
        mode={modalState.mode}
        student={modalState.selectedStudent}
        permissions={permissions}
        onClose={modalState.close}
        onCreate={onCreate.mutateAsync}
        onUpdate={onUpdate.mutateAsync}
      />
    </Box>
  );
}
