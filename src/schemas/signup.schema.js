import z from "zod";

export const signupFormSchema = z
  .object({
    fName: z
      .string()
      .nonempty({ message: "first name required" })
      .max(50, { message: "first name must be less than 50 characters" }),
    lName: z
      .string()
      .nonempty({ message: "last name required" })
      .max(50, { message: "last name must be less than 50 characters" }),
    email: z.string().email({ message: "invalid email" }).nonempty({
      message: "email required",
    }),
    language: z.string().nonempty({ message: "language required" }).max(50, {
      message: "language length should be less than 50 characters",
    }),
    gender: z.string().nonempty({ message: "gender required" }).max(50, {
      message: "gender length should be less than 50 characters",
    }),
    placeOfStay: z.string().nonempty({ message: "place of stay required" }),
    password: z
      .string()
      .nonempty({ message: "Password required" })
      .min(8, { message: "Password should be atleast 8 characters" })
      .max(32, { message: "Password should be atmost 32 characters" })
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        {
          message:
            "Password should contain atleast one uppercase, one lowercase, one number and one special character",
        }
      ),
    confirmPassword: z.string().nonempty({
      message: "confirm password required",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "passwords do not match",
    path: ["confirmPassword"],
  });
