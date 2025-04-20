import { z } from "zod";
const profileSchema = z.object({
  fullName: z.string().min(2, "יש להזין שם מלא (לפחות 2 תווים)"),
  idNumber: z
    .string()
    .min(9, "תעודת זהות חייבת להכיל 9 ספרות")
    .max(9, "תעודת זהות חייבת להכיל 9 ספרות"),
  phone: z
    .string()
    .min(10, "מספר טלפון לא תקין")
    .max(10, "מספר טלפון לא תקין"),
  email: z.string().email("כתובת אימייל לא תקינה"),
  selectedCities: z.array(z.string()).min(1, "יש לבחור לפחות עיר אחת"),
  selectedVolunteerOptions: z
    .array(z.string())
    .min(1, "יש לבחור לפחות תחום התנדבות אחד"),
    profileImage: z.string(),
});


export default profileSchema