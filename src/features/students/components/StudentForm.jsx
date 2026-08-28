import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextField, Stack, MenuItem } from "@mui/material";
import { StudentValidationSchema } from "../form/StudentValidationSchema";
import { MODES } from "../form/formConfig";

export default function StudentForm({ mode, defaultValues, onSubmit, onInvalid }) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(StudentValidationSchema),
    defaultValues: {
      studentNumber: defaultValues.student_number || "",
      program: defaultValues.program || "",
      yearLevel: defaultValues.year_level || 4,
      section: defaultValues.section || "",
      internshipStatus: defaultValues.internship_status || "pending",
    },
  });

  const isView = mode === MODES.VIEW;
  
  return (
    <form id="student-form" onSubmit={handleSubmit(onSubmit, onInvalid)}>
      <Stack spacing={2}>
        <TextField
          label="Student ID"
          {...register("studentNumber")}
          disabled={true}
        />
        <TextField
          label="Program"
          {...register("program")}
          disabled={true}
        />
        <TextField
          label="Year Level"
          type="number"
          {...register("yearLevel")}
          disabled={true}
        />
        <TextField
          label="Section"
          {...register("section")}
          disabled={true}
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
              disabled={isView}
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
