import { prisma } from '@/prisma/prisma-client';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const requests = await prisma.replenish.findMany();
        return NextResponse.json(requests);
    } catch (error) {
        return NextResponse.json({ error: `Failed to fetch requests ${error}`}, { status: 500 });
    }
}