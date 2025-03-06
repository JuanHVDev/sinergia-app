"use server";

import prisma from "@/lib/prisma";

export async function getSubscription(userId: string) {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
            subscription: true,
        },
    });
    if (!user) {
        throw new Error("User not found");
    }
    return user.subscription;
}
