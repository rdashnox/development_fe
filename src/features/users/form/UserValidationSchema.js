import { z } from "zod";
import { MODES } from "./formConfig";

const roleSchema = [
  "administrator",
  "internship_coordinator",
  "faculty_adviser",
  "student",
  "hte_supervisor",
];

const roleValidator = z
  .string()
  .min(1, "Role is required")
  .refine((value) => roleSchema.includes(value), "Role is required");

const optionalNullableString = (max, message) =>
  z.string().max(max, message).optional().nullable();

export const getValidationSchema = (mode) => {
  if (mode === MODES.CREATE) {
    return createUserValidationSchema;
  } 
  else if (mode === MODES.EDIT || mode === MODES.VIEW) {
    return editUserValidationSchema;
  }

  return editUserValidationSchema;
};

const createUserValidationSchema = z.object({
  email: z
    .string()
    .email("Must be a valid email")
    .min(1, "Email is required"),
  first_name: z
    .string()
    .min(1, "First name is required")
    .min(1, "First name must be at least 1 character")
    .max(50, "First name must be at most 50 characters"),
  middle_name: optionalNullableString(
    50,
    "Middle name must be at most 50 characters",
  ),
  last_name: z
    .string()
    .min(1, "Last name is required")
    .min(1, "Last name must be at least 1 character")
    .max(50, "Last name must be at most 50 characters"),
  suffix: z.string().optional().nullable(),
  role: roleValidator,
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(
      /[!@#$%^&*]/,
      "Password must contain at least one special character",
    ),
});

const editUserValidationSchema = z.object({
  email: z
    .string()
    .email("Must be a valid email")
    .min(1, "Email is required"),
  first_name: z
    .string()
    .min(1, "First name is required")
    .min(1, "First name must be at least 1 character")
    .max(50, "First name must be at most 50 characters"),
  middle_name: optionalNullableString(
    50,
    "Middle name must be at most 50 characters",
  ),
  last_name: z
    .string()
    .min(1, "Last name is required")
    .min(1, "Last name must be at least 1 character")
    .max(50, "Last name must be at most 50 characters"),
  suffix: z.string().optional().nullable(),
  role: roleValidator,
  is_active: z.boolean({ error: "Account status is required" }),
});

export default getValidationSchema;