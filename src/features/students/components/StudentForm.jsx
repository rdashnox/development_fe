import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextField, Stack, MenuItem } from "@mui/material";
import { StudentValidationSchema } from "../form/StudentValidationSchema";
import { MODES } from "../form/formConfig";

export default function StudentForm({ mode, defaultValues, onSubmit, onInvalid, isStudent }) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(StudentValidationSchema),
    defaultValues: {
      userId: defaultValues.userId || "",
      firstName: defaultValues.firstName || defaultValues.first_name || "",
      middleName: defaultValues.middleName || defaultValues.middle_name || "",
      lastName: defaultValues.lastName || defaultValues.last_name || "",
      studentNumber: defaultValues.studentNumber || defaultValues.student_number || "",
      program: defaultValues.program || "",
      yearLevel: defaultValues.yearLevel || defaultValues.year_level || 4,
      section: defaultValues.section || "",
      contactNumber: defaultValues.contactNumber || defaultValues.contact_number || "",
      address: defaultValues.address || "",
      emergencyContactName: defaultValues.emergencyContactName || defaultValues.emergency_contact_name || "",
      emergencyContactNumber: defaultValues.emergencyContactNumber || defaultValues.emergency_contact_number || "",
      internshipStatus: defaultValues.internshipStatus || defaultValues.internship_status || "pending",
    },
  });

  React.useEffect(() => {
    reset({
      userId: defaultValues.userId || defaultValues.user_id || defaultValues.user?.id || "",
      email: defaultValues.email || defaultValues.user?.email || "",
      firstName: defaultValues.firstName || defaultValues.first_name || defaultValues.user?.first_name || defaultValues.user?.firstName || "",
      middleName: defaultValues.middleName || defaultValues.middle_name || defaultValues.user?.middle_name || defaultValues.user?.middleName || "",
      lastName: defaultValues.lastName || defaultValues.last_name || defaultValues.user?.last_name || defaultValues.user?.lastName || "",
      studentNumber: defaultValues.studentNumber || defaultValues.student_number || "",
      program: defaultValues.program || "",
      yearLevel: defaultValues.yearLevel || defaultValues.year_level || 4,
      section: defaultValues.section || "",
      contactNumber: defaultValues.contactNumber || defaultValues.contact_number || "",
      address: defaultValues.address || "",
      emergencyContactName: defaultValues.emergencyContactName || defaultValues.emergency_contact_name || "",
      emergencyContactNumber: defaultValues.emergencyContactNumber || defaultValues.emergency_contact_number || "",
      internshipStatus: defaultValues.internshipStatus || defaultValues.internship_status || "pending",
    });
  }, [defaultValues, reset]);

  const isView = mode === MODES.VIEW;

  const handleFormSubmit = (data) => {
    const cleanedData = {
      ...data,
      contactNumber: data.contactNumber || null,
      address: data.address || null,
      emergencyContactName: data.emergencyContactName || null,
      emergencyContactNumber: data.emergencyContactNumber || null,
      yearLevel: Number(data.yearLevel),
    };
    onSubmit(cleanedData);
  };

  return (
    <form id="student-form" onSubmit={handleSubmit(handleFormSubmit, onInvalid)}>
      <Stack spacing={2}>
        <TextField
          label="User ID"
          {...register("userId")}
          error={!!errors.userId}
          helperText={errors.userId?.message}
          disabled={isView || isStudent}
        />
        <TextField
          label="Email Address"
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email?.message}
          disabled={isView || isStudent}
        />
        <TextField
          label="First Name"
          {...register("firstName")}
          error={!!errors.firstName}
          helperText={errors.firstName?.message}
          disabled={isView || isStudent}
        />
        <TextField
          label="Middle Name"
          {...register("middleName")}
          error={!!errors.middleName}
          helperText={errors.middleName?.message}
          disabled={isView || isStudent}
        />
        <TextField
          label="Last Name"
          {...register("lastName")}
          error={!!errors.lastName}
          helperText={errors.lastName?.message}
          disabled={isView || isStudent}
        />
        <TextField
          label="Student ID"
          {...register("studentNumber")}
          error={!!errors.studentNumber}
          helperText={errors.studentNumber?.message}
          disabled={isView || isStudent}
        />
        <TextField
          label="Program"
          {...register("program")}
          error={!!errors.program}
          helperText={errors.program?.message}
          disabled={isView || isStudent}
        />
        <TextField
          label="Year Level"
          type="number"
          {...register("yearLevel")}
          error={!!errors.yearLevel}
          helperText={errors.yearLevel?.message}
          disabled={isView || isStudent}
        />
        <TextField
          label="Section"
          {...register("section")}
          error={!!errors.section}
          helperText={errors.section?.message}
          disabled={isView || isStudent}
        />
        <TextField
          label="Contact Number"
          {...register("contactNumber")}
          error={!!errors.contactNumber}
          helperText={errors.contactNumber?.message}
          disabled={isView}
        />
        <TextField
          label="Address"
          {...register("address")}
          error={!!errors.address}
          helperText={errors.address?.message}
          disabled={isView}
        />
        <TextField
          label="Emergency Contact Name"
          {...register("emergencyContactName")}
          error={!!errors.emergencyContactName}
          helperText={errors.emergencyContactName?.message}
          disabled={isView}
        />
        <TextField
          label="Emergency Contact Number"
          {...register("emergencyContactNumber")}
          error={!!errors.emergencyContactNumber}
          helperText={errors.emergencyContactNumber?.message}
          disabled={isView}
        />
        <Controller
          name="internshipStatus"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              select
              label="Internship Status"
              error={!!errors.internshipStatus}
              helperText={errors.internshipStatus?.message}
              disabled={isView || isStudent}
            >
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
              <MenuItem value="dropped">Dropped</MenuItem>
            </TextField>
          )}
        />
      </Stack>
    </form>
  );
}
