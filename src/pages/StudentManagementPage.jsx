import { Box, Typography, CircularProgress } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { studentApi } from "../api/students";
import useAuth from "../hooks/useAuth";
import StudentTable from "../components/StudentTable"; 

export default function StudentManagementPage() {
    const { user } = useAuth();

    const { data: students, isLoading, error } = useQuery({
        queryKey: ["students"],
        queryFn: studentApi.listStudents,       
    });

    // Basic RBAC here, to only allow certain roles to view
    if (!["administrator", "internship_coordinator" ].includes(user?.role)) {
        return <Typography color="error">Access denied.</Typography>;
    }

    if (isLoading) return <CircularProgress />;
    if (error) return <Typography color="error">Error loading students.</Typography>;

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Student Management
            </Typography>
            <StudentTable data={students} />
        </Box>
    );
}