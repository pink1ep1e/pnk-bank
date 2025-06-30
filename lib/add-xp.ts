'use server';

import { prisma } from "@/prisma/prisma-client";

export const AddXp = async (id: number, xp: number) => {
    const user = await prisma.user.findFirst({
        where: {
            id: id,
        }
    })
    if (!user) return false;

    const lvl = await prisma.level.findFirst({
        where: {
            lvl: Number(user.lvl)
        }
    })
    if (!lvl) return false;

    await prisma.user.update({
        where: {
            id: user.id
        },
        data: {
            xp: Number(user.xp) + xp
        }
    })

    return true;
}