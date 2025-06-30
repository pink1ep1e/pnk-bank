import { NextResponse } from 'next/server';
import { prisma } from '@/prisma/prisma-client';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/constants/auth-options';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ error: 'Необходима авторизация' }, { status: 401 });
    }

    if (userId !== session.user.id) {
        return NextResponse.json({ error: 'Нет доступа к данным другого пользователя' }, { status: 403 });
    }

    if (!userId) {
        return NextResponse.json({ error: 'Необходим userId' }, { status: 400 });
    }

    try {
        const transactions = await prisma.transactions.findMany({
            where: {
                OR: [
                    { transactionSenderId: Number(userId) },
                    { transactionRecipientId: Number(userId) },
                ],
            },
            orderBy: {
                createdAt: 'desc',
            },
            take: 25
        });

        return NextResponse.json(transactions, { status: 200 });
    } catch (error) {
        console.error('Ошибка при получении транзакций:', error);
        return NextResponse.json({ error: 'Ошибка при получении транзакций' }, { status: 500 });
    }
} 