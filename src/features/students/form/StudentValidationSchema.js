import { z } from "zod";

export const StudentValidationSchema = z.object({
  firstName: z.string().min(1, "First Name is required"),
  lastName: z.string().min(1, "Last Name is required"),
  middleName: z.string().optional().nullable(),
  studentNumber: z.string().min(1, "Student ID is required"),
  program: z.string().min(1, "Program is required"),
  yearLevel: z.coerce.number().min(1, "Year Level is required"),
  internshipStatus: z.enum(["pending", "active", "completed", "dropped"]),
});
