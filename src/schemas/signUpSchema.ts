import { z } from 'zod';

export const usernameValidation = z
    .string()
    .min(2, "Username must be at least 2 characters")
    .max(20, "Username must be no more than 20 characters") 
    .regex(/^(?=.*[a-zA-Z])[a-zA-Z0-9_]+$/, 
       "Username must contain at least one letter")


export const signUpSchema = z.object({

    username: usernameValidation,

    email: z
        .string()
        .regex(/.+@.+\..+/, "Please enter a valid email address"),

    password: z.string().min(6, { message: "Password must be at least 6 characters" }),

    gender: z.enum(['male', 'female', 'others'], {
        message: "Invalid gender selection"
    }),

    phoneNo: z
        .string()
        .regex(/^[0-9]+$/, "Phone number must contain only digits")
        .length(10, "Phone number must be of 10 digits")
});
