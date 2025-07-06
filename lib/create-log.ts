'use server';

import { prisma } from "@/prisma/prisma-client";

export const CreateLog = async (admin: string, desc: string) => {
    try {
        await prisma.logs.create({
            data: {
                admin: admin,
                description: desc
            }
        });
        return true;

    } catch (error) {
        console.error("Ошибка при создании лога:", error);
        return false;
    }
}