import { z } from "zod";

export const StudentValidationSchema = z.object({
  userId: z.string().optional(),
  studentNumber: z.string().min(1, "Student ID is required"),
  program: z.string().min(1, "Program is required"),
  yearLevel: z.coerce.number().min(1, "Year Level is required"),
  section: z.string().optional().nullable(),
  contactNumber: z.string().optional().nullable(),
  address: z.string().optional().nullable(),
  emergencyContactName: z.string().optional().nullable(),
  emergencyContactNumber: z.string().optional().nullable(),
  internshipStatus: z.enum(["pending", "active", "completed", "dropped"]),
});
