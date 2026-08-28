import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextField, Stack, MenuItem } from "@mui/material";
import { StudentValidationSchema } from "../form/StudentValidationSchema";
import { MODES } from "../form/formConfig";

export default function StudentForm({ mode, defaultValues, onSubmit, onInvalid }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(StudentValidationSchema),
    defaultValues: mode === MODES.CREATE ? {} : defaultValues,
  });

  const isView = mode === MODES.VIEW;
  const isCreate = mode === MODES.CREATE;

  return (
    <form id="student-form" onSubmit={handleSubmit(onSubmit, onInvalid)}>
      <Stack spacing={2}>
        <TextField
          label="First Name"
          {...register("firstName")}
          error={!!errors.firstName}
          helperText={errors.firstName?.message}
          disabled={isView || !isCreate}
        />
        <TextField
          label="Last Name"
          {...register("lastName")}
          error={!!errors.lastName}
          helperText={errors.lastName?.message}
          disabled={isView || !isCreate}
        />
        <TextField
          label="Middle Name"
          {...register("middleName")}
          error={!!errors.middleName}
          helperText={errors.middleName?.message}
          disabled={isView || !isCreate}
        />
        <TextField
          label="Student ID"
          {...register("studentNumber")}
          error={!!errors.studentNumber}
          helperText={errors.studentNumber?.message}
          disabled={isView || !isCreate}
        />
        <TextField
          label="Program"
          {...register("program")}
          error={!!errors.program}
          helperText={errors.program?.message}
          disabled={isView || !isCreate}
        />
        <TextField
          label="Year Level"
          type="number"
          {...register("yearLevel")}
          error={!!errors.yearLevel}
          helperText={errors.yearLevel?.message}
          disabled={isView}
        />
        <TextField
          select
          label="Internship Status"
          {...register("internshipStatus")}
          error={!!errors.internshipStatus}
          helperText={errors.internshipStatus?.message}
          disabled={isView}
        >
          <MenuItem value="pending">Pending</MenuItem>
          <MenuItem value="active">Active</MenuItem>
          <MenuItem value="completed">Completed</MenuItem>
          <MenuItem value="dropped">Dropped</MenuItem>
        </TextField>
      </Stack>
    </form>
  );
}
