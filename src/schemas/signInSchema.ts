import { z } from 'zod';

export const usernameValidation = z
    .string()
    .min(2, "Username must be at least 2 characters")
    .max(20, "Username must be no more than 20 characters") 
    .regex(/^(?=.*[a-zA-Z])[a-zA-Z0-9_]+$/, 
       "Username must contain at least one letter")


export const signInSchema = z.object({
    
    username: usernameValidation,

    password: z.string().min(6, { message: "Password must be at least 6 characters" }),

});