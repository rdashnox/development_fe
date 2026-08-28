import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextField, Stack, MenuItem } from "@mui/material";
import { StudentValidationSchema } from "../form/StudentValidationSchema";
import { MODES } from "../form/formConfig";
import { useQuery } from "@tanstack/react-query";
import { usersApi } from "../../../api/users";

export default function StudentForm({ mode, defaultValues, onSubmit, onInvalid }) {
  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: usersApi.listUsers,
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(StudentValidationSchema),
    defaultValues: {
      userId: defaultValues.userId || "",
      studentNumber: defaultValues.studentNumber || "",
      program: defaultValues.program || "",
      yearLevel: defaultValues.yearLevel || 4,
      internshipStatus: defaultValues.internshipStatus || "pending",
    },
  });

  const isView = mode === MODES.VIEW;
  const isEdit = mode === MODES.EDIT;
  
  return (
    <form id="student-form" onSubmit={handleSubmit(onSubmit, onInvalid)}>
      <Stack spacing={2}>
        <Controller
          name="userId"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              select
              label="Select Student User"
              error={!!errors.userId}
              helperText={errors.userId?.message}
              disabled={isView || isEdit}
            >
              {users.filter(u => u.role === 'student').map((user) => (
                <MenuItem key={user.id} value={user.id}>
                  {user.firstName} {user.lastName}
                </MenuItem>
              ))}
            </TextField>
          )}
        />
        <TextField
          label="Student ID"
          {...register("studentNumber")}
          error={!!errors.studentNumber}
          helperText={errors.studentNumber?.message}
          disabled={isView || isEdit}
        />
        <TextField
          label="Program"
          {...register("program")}
          error={!!errors.program}
          helperText={errors.program?.message}
          disabled={isView || isEdit}
        />
        <TextField
          label="Year Level"
          type="number"
          {...register("yearLevel")}
          error={!!errors.yearLevel}
          helperText={errors.yearLevel?.message}
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
              disabled={true}
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
