import { z } from "zod";

export const getProfileOrganizationSchema = (isEditMode: boolean) =>
  z.object({
    name: z.string().min(2, "יש להזין שם מלא (לפחות 2 תווים)"),
    phone: z
      .string()
      .min(10, "מספר טלפון לא תקין")
      .max(10, "מספר טלפון לא תקין"),
    email: z.string().email("כתובת אימייל לא תקינה"),
    profileImage: z.any().optional(),

    password: isEditMode
      ? z.string().optional()
      : z.string()
          .min(8, "הסיסמה חייבת להכיל לפחות 8 תווים")
          .regex(/[A-Z]/, "הסיסמה חייבת להכיל לפחות אות גדולה אחת")
          .regex(/[a-z]/, "הסיסמה חייבת להכיל לפחות אות קטנה אחת")
          .regex(/[0-9]/, "הסיסמה חייבת להכיל לפחות ספרה אחת")
          .regex(/[^A-Za-z0-9]/, "הסיסמה חייבת להכיל לפחות תו מיוחד אחד"),

    organizationNumber: z
      .string()
      .min(10, "מספר הארגון חייב לכלול 10 ספרות")
      .max(10, "מספר הארגון חייב לכלול 10 ספרות"),
  });

export default getProfileOrganizationSchema;
