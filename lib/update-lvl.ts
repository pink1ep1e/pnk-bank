'use server';

import { prisma } from "@/prisma/prisma-client";

export const UpdateLvl = async (id: number) => {
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


    if (Number(user.xp) >= lvl.xp) {
        if (Number(user.lvl) != 32) {
            await prisma.user.update({
                where: {
                    id: user.id
                },
                data: {
                    xp: Number(user.xp) - lvl.xp
                }
            })
    
            await prisma.user.update({
                where: {
                    id: user.id
                },
                data: {
                    lvl: Number(user.lvl) + 1
                }
            })
        }
    }

    return true;
}