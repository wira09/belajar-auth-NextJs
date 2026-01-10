"use server";

import { RegisterSchema } from "@/lib/zod"
import { hashSync } from "bcrypt-ts"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"

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