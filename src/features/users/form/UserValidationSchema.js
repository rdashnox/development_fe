<<<<<<< HEAD
import { z } from "zod";
import { MODES } from "./formConfig";
=======
// userValidationSchema.js
import * as yup from "yup";
import {MODES} from "./formConfig"
>>>>>>> e39f402 ([FR-02] User management page with API integration)

const roleSchema = [
  "administrator",
  "internship_coordinator",
  "faculty_adviser",
  "student",
  "hte_supervisor",
];

<<<<<<< HEAD
const roleValidator = z
  .string()
  .min(1, "Role is required")
  .refine((value) => roleSchema.includes(value), "Role is required");

const optionalNullableString = (max, message) =>
  z.string().max(max, message).optional().nullable();

=======
>>>>>>> e39f402 ([FR-02] User management page with API integration)
export const getValidationSchema = (mode) => {
  if (mode === MODES.CREATE) {
    return createUserValidationSchema;
  } 
  else if (mode === MODES.EDIT || mode === MODES.VIEW) {
    return editUserValidationSchema;
  }

  return editUserValidationSchema;
};

<<<<<<< HEAD
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
=======
const createUserValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Must be a valid email")
    .required("Email is required"),
  first_name: yup
    .string()
    .required("First name is required")
    .min(1, "First name must be at least 1 character")
    .max(50, "First name must be at most 50 characters"),
  middle_name: yup
    .string()
    .optional()
    .nullable()
    .max(50, "Middle name must be at most 50 characters"),
  last_name: yup
    .string()
    .required("Last name is required")
    .min(1, "Last name must be at least 1 character")
    .max(50, "Last name must be at most 50 characters"),
  suffix: yup.string().optional().nullable(),
  role: yup.string().oneOf(roleSchema).required("Role is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
>>>>>>> e39f402 ([FR-02] User management page with API integration)
      /[!@#$%^&*]/,
      "Password must contain at least one special character",
    ),
});

<<<<<<< HEAD
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
=======
const editUserValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Must be a valid email")
    .required("Email is required"),
  first_name: yup
    .string()
    .required("First name is required")
    .min(1, "First name must be at least 1 character")
    .max(50, "First name must be at most 50 characters"),
  middle_name: yup
    .string()
    .optional()
    .nullable()
    .max(50, "Middle name must be at most 50 characters"),
  last_name: yup
    .string()
    .required("Last name is required")
    .min(1, "Last name must be at least 1 character")
    .max(50, "Last name must be at most 50 characters"),
  suffix: yup.string().optional().nullable(),
  role: yup.string().oneOf(roleSchema).required("Role is required"),
  is_active: yup.boolean().required("Account status is required"),
>>>>>>> e39f402 ([FR-02] User management page with API integration)
});

export default getValidationSchema;