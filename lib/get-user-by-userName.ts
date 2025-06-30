import { prisma } from "@/prisma/prisma-client";

type UserWithCards = {
  id: number;
  userName: string;
  lvl: number | null;
  xp: number | null;
  card: { id: number; balance: number }[];
};

export async function getUserByUsername(userName: string): Promise<UserWithCards | null> {
    return prisma.user.findFirst({
        where: {
          userName,
        },
        select: {
            id: true,
            userName: true,
            lvl: true,
            xp: true,
            card: {
                select: {
                    id: true,
                    balance: true,
                },
            },
        },      
    });
  }