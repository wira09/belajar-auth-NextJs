"use serve"
import { RegisterSchema } from "@/lib/zod"

export const signUpCredentials = async (formData: FormData) => {
    const validateField = RegisterSchema.safeParse(Object.fromEntries(formData.entries()))

    if (!validateField.success) {
        return {
            error: validateField.error.flatten().fieldErrors
        }
    }

    const { } = validateField.data
}