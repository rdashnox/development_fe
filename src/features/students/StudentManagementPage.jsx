import { Box, Typography, CircularProgress, Alert, Button } from "@mui/material";
import CardStat from "../../components/common/CardStat";
import StudentTable from "./components/StudentTable";
import StudentModal from "./components/StudentModal";
import useAuth from "../../hooks/useAuth";
import { useStudents } from "./hooks/useStudents";
import { useUsers } from "../users/hooks/useUsers";
import { useStudentMutations } from "./hooks/useStudentMutations";
import { useStudentModalState } from "./hooks/useStudentModalState";
import { getStudentManagementPermissions } from "./studentPermissions";
import { MODES } from "./form/formConfig";
import { useMemo } from "react";

export default function StudentManagementPage() {
  const { user, isLoading: isAuthLoading } = useAuth();
  const { data: students, isLoading: isStudentsLoading, isError: isStudentsError, error: studentsError } = useStudents(user?.role);
  const { data: userData = [], isLoading: isUsersLoading } = useUsers();
  const modalState = useStudentModalState();
  const { onCreate, onUpdate } = useStudentMutations();
  
  const permissions = getStudentManagementPermissions(user?.role);
  
  // Merge student records with user metadata for names
  const mergedStudents = useMemo(() => {
    console.log("DEBUG - Raw Students:", students);
    console.log("DEBUG - Raw Users:", userData);

    if (!students) return [];
    const studentsArr = Array.isArray(students) ? students : [students];

    return studentsArr.map((student) => {
      // 1. Resolve student's linked user ID
      const studentUserId = student.userId || student.user_id || student.id || student.user?.id;

      // 2. Find matching user record
      const userRecord = userData?.find(
        (u) =>
          u.id === studentUserId ||
          u.userId === studentUserId ||
          u.user_id === studentUserId
      ) || student.user || {};

      // 3. Extract user metadata/flat name fields
      const meta = userRecord.user_metadata || {};
      const firstName = userRecord.first_name || userRecord.firstName || meta.first_name || meta.firstName || student.firstName || student.first_name || "";
      const middleName = userRecord.middle_name || userRecord.middleName || meta.middle_name || meta.middleName || student.middleName || student.middle_name || "";
      const lastName = userRecord.last_name || userRecord.lastName || meta.last_name || meta.lastName || student.lastName || student.last_name || "";
      const email = student.email || userRecord.email || meta.email || "";

      return {
        ...student,
        userId: studentUserId,
        email: email,
        firstName,
        lastName,
        middleName,
      };
    });
  }, [students, userData]);

  if (isAuthLoading || isStudentsLoading || isUsersLoading) return <CircularProgress />;
  if (!permissions.canView) return <Typography color="error">Access denied.</Typography>;
  if (isStudentsError) return <Alert severity="error">{studentsError?.message || "Error loading students."}</Alert>;

  return (
    <Box sx={{ background: "#F7F9FB", minHeight: "100vh", p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h5" fontWeight={600}>Student Records</Typography>
        {permissions.canCreate && (
          <Button 
            variant="contained" 
            onClick={() => modalState.open(MODES.CREATE)}
          >
            Add Student
          </Button>
        )}
      </Box>

      <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 2, mb: 4 }}>
        <CardStat title="Total Records" value={mergedStudents.length} />
        <CardStat title="Students with Active Internships" value={mergedStudents.filter(s => s.internship_status === "active").length} />
      </Box>

      <StudentTable 
        data={mergedStudents} 
        role={user?.role}
        onEdit={(student) => modalState.open(MODES.EDIT, student)}
      />

      <StudentModal
        open={modalState.isOpen}
        mode={modalState.mode}
        student={modalState.selectedStudent}
        permissions={permissions}
        onClose={modalState.close}
        onCreate={onCreate.mutateAsync}
        onUpdate={onUpdate.mutateAsync}
        isStudent={false}
      />
    </Box>
  );
}
