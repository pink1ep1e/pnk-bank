import { NextResponse } from 'next/server';
import { getPaymentStatus } from '@/lib/payment-system';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const paymentId = searchParams.get('paymentId');
    const recipient = searchParams.get('recipient');
    const amount = searchParams.get('amount');
    const description = searchParams.get('description');

    if (!paymentId || !recipient || !amount || !description) {
        return NextResponse.json({ error: 'Недостаточно данных для проверки статуса платежа' }, { status: 400 });
    }

    const status = await getPaymentStatus(paymentId, recipient, parseFloat(amount), description);

    if (!status) {
        return NextResponse.json({ error: 'Платеж не найден' }, { status: 404 });
    }

    return NextResponse.json(status);
} 