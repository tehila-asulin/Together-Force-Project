import { z } from "zod";

const AddVolunteeringSchema = z.object({
  title: z.string().min(1, "יש לבחור אפשרות התנדבות אחת"),

  description: z.string().optional(),

 origin: z.string().nonempty("יש לבחור עיר אחת"),

  phone: z
    .string()
    .regex(/^0\d{1,2}-?\d{7}$/, "מספר טלפון לא תקין"),

  isDone: z.boolean({
    required_error: "יש לבחור אם המשימה הושלמה או לא",
  }),
deadline: z
  .date({
    required_error: "יש להזין תאריך יעד",
    invalid_type_error: "התאריך אינו תקין",
  })
  .refine((date) => date >= new Date(), {
    message: "התאריך חייב להיות מהזמן הנוכחי והלאה",
  }),
});

export default AddVolunteeringSchema;
