import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { savePayment } from '@/lib/payment-system';
import { PAYMENT_STATUS } from '@prisma/client';

export async function POST(request: Request) {
    const { amount, recipient, description, shopUrl } = await request.json();


    if (!amount || !recipient || !description || !shopUrl) {
        return NextResponse.json({ error: 'Недостаточно данных для создания платежа' }, { status: 400 });
    }

    // Генерация уникального ID платежа
    const paymentId = uuidv4();
    // Сохранение информации о платеже в базе данных
    const savedPayment = await savePayment(
        paymentId,
        amount,
        recipient,
        shopUrl,
        description,
        PAYMENT_STATUS.PENDING
    );

    if (!savedPayment) {
        return NextResponse.json({ error: 'Ошибка при сохранении платежа' }, { status: 500 });
    }

    // Создание URL для редиректа
    const paymentUrl = `https://pnk-bank.vercel.app//pay?paymentId=${paymentId}&amount=${amount}&recipient=${recipient}&description=${description}&shopUrl=${shopUrl}`;

    return NextResponse.json({ paymentUrl, paymentId });
} 