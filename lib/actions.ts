"use server";

import { RegisterSchema, SignInSchema } from "@/lib/zod"
import { hashSync } from "bcrypt-ts"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export const signUpCredentials = async (prevState: unknown, formData: FormData) => {
    const validateField = RegisterSchema.safeParse(Object.fromEntries(formData.entries()))

    if (!validateField.success) {
        return {
            error: validateField.error.flatten().fieldErrors,
            data: Object.fromEntries(formData.entries())
        }
    }

    const { name, email, password } = validateField.data
    const hashedPassword = hashSync(password, 10)

    try {
        await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            }
        })
    } catch (error) {
        return { message: "Failed to register login" }
    }
    redirect("/login")
}

// sign in
export const signInCredentials = async (prevstate: unknown, formData: FormData) => {
    const validateField = SignInSchema.safeParse(Object.fromEntries(formData.entries()))

    if (!validateField.success) {
        return {
            error: validateField.error.flatten().fieldErrors,
            data: Object.fromEntries(formData.entries())
        }
    }

    const { email, password } = validateField.data;

    try {
        await signIn("credentials", { email, password, redirectTo: "/dashboard" })
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { message: "Invalid Credentials." }
                default:
                    return { message: "Somethink went wrong." }
            }
        }
        throw error;
    }
}