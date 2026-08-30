import React, { useState } from "react";
import { Box, Typography, CircularProgress, Alert, Card, CardContent, Grid, TextField, Button, Chip, Divider } from "@mui/material";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { useStudents } from "./hooks/useStudents";
import { useStudentMutations } from "./hooks/useStudentMutations";

export default function StudentProfilePage() {
  const { user, isLoading: isAuthLoading } = useAuth();
  const { data: student, isLoading, isError, error } = useStudents(user?.role);
  const { onUpdate } = useStudentMutations();
  const [isEditing, setIsEditing] = useState(false);

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      contactNumber: student?.contact_number || "",
      address: student?.address || "",
      emergencyContactName: student?.emergency_contact_name || "",
      emergencyContactNumber: student?.emergency_contact_number || "",
    }
  });

  // Reset form when student data loads or isEditing toggles
  React.useEffect(() => {
    if (student) {
      reset({
        contactNumber: student.contact_number || "",
        address: student.address || "",
        emergencyContactName: student.emergency_contact_name || "",
        emergencyContactNumber: student.emergency_contact_number || "",
      });
    }
  }, [student, isEditing, reset]);

  if (isAuthLoading || isLoading) return <CircularProgress />;
  if (isError) return <Alert severity="error">{error?.message || "Error loading profile."}</Alert>;
  if (!student) return <Typography>No profile found.</Typography>;

  const contactFields = [
    { label: "Contact Number", name: "contactNumber", value: student.contact_number },
    { label: "Address", name: "address", value: student.address },
    { label: "Emergency Name", name: "emergencyContactName", value: student.emergency_contact_name },
    { label: "Emergency Number", name: "emergencyContactNumber", value: student.emergency_contact_number },
  ];

  const onSubmit = async (data) => {
    try {
      const payload = {
        contactNumber: data.contactNumber,
        address: data.address,
        emergencyContactName: data.emergencyContactName,
        emergencyContactNumber: data.emergencyContactNumber,
      };
      await onUpdate.mutateAsync({ id: student.id, payload, role: user.role });
      setIsEditing(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box sx={{ p: 3, background: "#F7F9FB", minHeight: "100vh" }}>
      <Card sx={{ maxWidth: 800, mx: 'auto', p: 2 }}>
        <CardContent>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
            <Typography variant="h5" fontWeight={600}>My Profile</Typography>
            {!isEditing ? (
              <Button variant="contained" onClick={() => setIsEditing(true)}>Edit Profile</Button>
            ) : (
              <Box>
                <Button onClick={() => setIsEditing(false)} sx={{ mr: 1 }}>Cancel</Button>
                <Button variant="contained" color="success" onClick={handleSubmit(onSubmit)}>Save Changes</Button>
              </Box>
            )}
          </Box>
          
          <Divider sx={{ mb: 3 }} />

          <Grid container spacing={3}>
            <Grid xs={12} md={6}><Typography variant="subtitle2" color="textSecondary">Student ID</Typography><Typography variant="body1">{student.student_number}</Typography></Grid>
            <Grid xs={12} md={6}><Typography variant="subtitle2" color="textSecondary">Program</Typography><Typography variant="body1">{student.program}</Typography></Grid>
            <Grid xs={12} md={6}><Typography variant="subtitle2" color="textSecondary">Year Level</Typography><Typography variant="body1">{student.year_level}</Typography></Grid>
            <Grid xs={12} md={6}><Typography variant="subtitle2" color="textSecondary">Internship Status</Typography><Chip label={student.internship_status} color={student.internship_status === 'active' ? 'success' : 'default'} /></Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h6" gutterBottom>Contact Information</Typography>
          <Grid container spacing={2}>
            {contactFields.map((field) => (
              <Grid key={field.name} xs={12} md={6}>
                <Typography variant="subtitle2" color="textSecondary">
                  {field.label}
                </Typography>
                {isEditing ? (
                  <TextField fullWidth {...register(field.name)} size="small" margin="dense" />
                ) : (
                  <Typography variant="body1">{field.value || "N/A"}</Typography>
                )}
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}
