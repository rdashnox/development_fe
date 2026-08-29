import { Box, Typography, CircularProgress, Alert, Button } from "@mui/material";
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
  const { data: students, isLoading, isError, error } = useStudents(user?.role);
  const modalState = useStudentModalState();
  const { onCreate, onUpdate } = useStudentMutations();
  
  const permissions = getStudentManagementPermissions(user?.role);
  const isStudent = user?.role === 'student';
  const safeStudents = students || [];

  if (isAuthLoading || isLoading) return <CircularProgress />;
  if (!permissions.canView) return <Typography color="error">Access denied.</Typography>;
  if (isError) return <Alert severity="error">{error?.message || "Error loading students."}</Alert>;

  return (
    <Box sx={{ background: "#F7F9FB", minHeight: "100vh", p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h5" fontWeight={600}>
          {isStudent ? "My Profile" : "Student Records"}
        </Typography>
        {isStudent && (
          <Button variant="contained" onClick={() => modalState.open(MODES.EDIT, safeStudents[0])}>
            Edit Profile
          </Button>
        )}
      </Box>

      {!isStudent && (
        <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 2, mb: 4 }}>
          <CardStat title="Total Records" value={safeStudents.length} />
          <CardStat title="Active" value={safeStudents.filter(s => s.internship_status === "active").length} />
        </Box>
      )}

      {isStudent ? (
        <Box sx={{ p: 2, background: 'white', borderRadius: 1 }}>
          <Typography variant="h6" gutterBottom>My Profile</Typography>
          <StudentTable data={safeStudents} role={user?.role} />
        </Box>
      ) : (
        <StudentTable 
          data={safeStudents} 
          role={user?.role}
          onEdit={(student) => modalState.open(MODES.EDIT, student)}
        />
      )}

      <StudentModal
        open={modalState.isOpen}
        mode={modalState.mode}
        onModeChange={(newMode) => modalState.open(newMode, modalState.selectedStudent)}
        student={modalState.selectedStudent}
        permissions={permissions}
        onClose={modalState.close}
        onCreate={onCreate.mutateAsync}
        onUpdate={onUpdate.mutateAsync}
        isStudent={isStudent}
      />
    </Box>
  );
}
