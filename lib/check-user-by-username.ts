import { prisma } from "@/prisma/prisma-client";

export async function checkUserByUserName(userName: string){
    const user = await prisma.user.findFirst({
        where: {
          userName,
        },
    });

    if (!user) {
        return;
    }

    return user.userName
  }