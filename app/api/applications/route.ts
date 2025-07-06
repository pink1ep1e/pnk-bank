import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
    try {
        const applications = await prisma.application.findMany();
        return NextResponse.json(applications);
    } catch (error) {
        return NextResponse.json({ error: `Failed to fetch applications ${error}` }, { status: 500 });
    }
}