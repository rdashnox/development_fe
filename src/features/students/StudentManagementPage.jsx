import { Box, Typography, CircularProgress, Alert } from "@mui/material";
import CardStat from "../../components/common/CardStat";
import StudentTable from "./components/StudentTable";
import StudentModal from "./components/StudentModal";
import useAuth from "../../hooks/useAuth";
import { useStudents } from "./hooks/useStudents";
import { useStudentMutations } from "./hooks/useStudentMutations";
import { useStudentModalState } from "./hooks/useStudentModalState";
import { getStudentManagementPermissions } from "./studentPermissions";
import { MODES } from "./form/formConfig";

export default function StudentManagementPage() {
  const { user, isLoading: isAuthLoading } = useAuth();
  // Pass the role to useStudents
  const { data: students, isLoading, isError, error } = useStudents(user?.role);
  const modalState = useStudentModalState();
  const { onCreate, onUpdate } = useStudentMutations();
  
  const permissions = getStudentManagementPermissions(user?.role);
  
  // Normalize data: if user is student, wrap single object in an array
  const safeStudents = isLoading || isError || !students ? [] : (Array.isArray(students) ? students : [students]);

  if (isAuthLoading || isLoading) return <CircularProgress />;
  if (!permissions.canView) return <Typography color="error">Access denied.</Typography>;
  if (isError) return <Alert severity="error">{error?.message || "Error loading students."}</Alert>;

  return (
    <Box sx={{ background: "#F7F9FB", minHeight: "100vh", p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h5" fontWeight={600}>Student Records</Typography>
      </Box>

      <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 2, mb: 4 }}>
        <CardStat title="Total Records" value={safeStudents.length} />
        <CardStat title="Active" value={safeStudents.filter(s => s.internship_status === "active").length} />
      </Box>

      <StudentTable 
        data={safeStudents} 
        onEdit={(student) => modalState.open(MODES.EDIT, student)}
      />

      <StudentModal
        open={modalState.isOpen}
        mode={modalState.mode}
        onModeChange={(newMode) => modalState.open(newMode, modalState.selectedStudent)}
        student={modalState.selectedStudent}
        permissions={permissions}
        onClose={modalState.close}
        onCreate={onCreate.mutateAsync}
        onUpdate={onUpdate.mutateAsync}
      />
    </Box>
  );
}
