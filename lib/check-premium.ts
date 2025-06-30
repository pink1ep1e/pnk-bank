'use server';

import { prisma } from "@/prisma/prisma-client";

export const checkPremium = async (id: number) => {
    const findPremium = await prisma.premium.findFirst({
        where: {
            userId: id,
        }
    })

    if (!findPremium) {
        return false;
    }

    if (findPremium.ending < new Date()) {
        return false;
    }
    return true;
}