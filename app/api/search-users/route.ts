import { NextResponse } from 'next/server';
import { prisma } from '@/prisma/prisma-client';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query') || '';

    const users = await prisma.user.findMany({
        where: {
            userName: {
                contains: query,
                mode: 'insensitive', 
            },
        },
        select: {
            userName: true, 
        },
        take: 5,
    });

    return NextResponse.json(users);
}