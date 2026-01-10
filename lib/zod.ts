import { object, string } from "zod";

export const SignInSchema = object({
    email: string().email("Invalid Email"),
    password: string()
        .min(8, "password must be more than 8 characters")
        .max(32, "password must be more than 8 characters"),
})

export const RegisterSchema = object({
    name: string().min(1, "Name must be more than 1 character"),
    email: string().email("Invalid Email"),
    password: string()
        .min(8, "password must be more than 8 characters")
        .max(32, "password must be more than 8 characters"),
    confirmPassword: string()
        .min(8, "password must be more than 8 characters")
        .max(32, "password must be more than 8 characters"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Password does not match",
    path: ["confirmPassword"],
});
