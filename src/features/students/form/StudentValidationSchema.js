import { z } from "zod";

export const StudentValidationSchema = z.object({
  userId: z.string().min(1, "User selection is required"),
  studentNumber: z.string().min(1, "Student ID is required"),
  program: z.string().min(1, "Program is required"),
  yearLevel: z.coerce.number().min(1, "Year Level is required"),
  internshipStatus: z.enum(["pending", "active", "completed", "dropped"]),
});
