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
    formState: { errors },
  } = useForm({
    resolver: zodResolver(StudentValidationSchema),
    defaultValues: {
      userId: defaultValues.userId || "",
      studentNumber: defaultValues.student_number || defaultValues.studentNumber || "",
      program: defaultValues.program || "",
      yearLevel: defaultValues.year_level || defaultValues.yearLevel || 4,
      section: defaultValues.section || "",
      contactNumber: defaultValues.contact_number || defaultValues.contactNumber || "",
      address: defaultValues.address || "",
      emergencyContactName: defaultValues.emergency_contact_name || defaultValues.emergencyContactName || "",
      emergencyContactNumber: defaultValues.emergency_contact_number || defaultValues.emergencyContactNumber || "",
      internshipStatus: defaultValues.internship_status || defaultValues.internshipStatus || "pending",
    },
  });

  const isView = mode === MODES.VIEW;

  return (
    <form id="student-form" onSubmit={handleSubmit(onSubmit, onInvalid)}>
      <Stack spacing={2}>
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
