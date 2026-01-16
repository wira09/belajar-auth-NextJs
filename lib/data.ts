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

// jika selain admin mengakses menu product akan di redirect ke halaman dashboard
export const getProductByUser = async () => {
    const session = await auth();
    if (!session || !session.user) redirect("/dashboard");
    const role = session.user.role;

    if (role === "admin") {
        try {
            // urutkan ke yg paling lama
            const product = await prisma.product.findMany({
                include: { user: { select: { name: true } } },
                orderBy: {
                    id: 'asc',
                }
            });
            return product;
        } catch (error) {
            console.log("🚀 ~ getProductByUser ~ error:", error)
        }
    } else {
        try {
            // urutkan ke yg paling lama
            const product = await prisma.product.findMany({
                where: { userId: session.user.id },
                include: { user: { select: { name: true } } },
                orderBy: {
                    id: 'asc',
                }
            });
            return product;
        } catch (error) {
            console.log("🚀 ~ getProductByUser ~ error:", error)
        }
    }
}