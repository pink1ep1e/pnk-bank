import { NextResponse } from 'next/server';
import { getPayCheck } from '@/lib/payment-system'; // Предположим, что у нас есть функция для получения статуса платежа из базы данных

export async function POST(request: Request) {
    const { paymentId } = await request.json();

    if (!paymentId) {
        return NextResponse.json({ error: 'Необходимо указать ID платежа' }, { status: 400 });
    }

    const paymentStatus = await getPayCheck(paymentId);

    if (!paymentStatus) {
        return NextResponse.json({ error: 'Платеж не найден' }, { status: 404 });
    }

    return NextResponse.json(paymentStatus);
}