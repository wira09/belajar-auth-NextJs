import { prisma } from "./prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

// jika selain admin mengakses menu users akan di redirect ke halaman dashboard
export const getUsers = async () => {
    const session = await auth();
    if (!session || !session.user || session.user.role !== "admin") redirect("/dashboard");

    try {
        // urutkan ke yg paling lama
        const users = await prisma.user.findMany({
            orderBy: {
                id: 'asc',
            }
        });
        return users;
    } catch (error) {
        console.log("🚀 ~ getUsers ~ error:", error)
    }
}