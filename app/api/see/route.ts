import { NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma-client";
import { getUserSession } from "@/lib/get-user-session";

export async function GET() {
    const currentUser = await getUserSession();

    if (!currentUser) {
        return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    const user = await prisma.user.findFirst({
        where: {
            id: Number(currentUser?.id),
        }
    });

    if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 400 });
    }

    const activeRequests = await prisma.replenish.findFirst({
        where: {
            recipient: user.userName,
            status: {
                in: ['PENDING', 'WAITING']
            }
        }
    });

    if (activeRequests) {
        return NextResponse.json(activeRequests);
    } else {
        return NextResponse.json(null);
    }
}