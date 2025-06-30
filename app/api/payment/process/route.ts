import { NextResponse } from 'next/server';
import { processPayment } from '@/lib/payment-system'; // Предположим, что у нас есть функция для обработки платежа
import { TRANSACTION_TYPE } from '@prisma/client';

export async function POST(request: Request) {
    const { paymentId, amount, recipient, sender } = await request.json();

    try {

        const result = await processPayment(paymentId, amount, sender, recipient, 
            recipient == 'government' ? TRANSACTION_TYPE.GOVERNMENT 
            : 
            recipient == 'bank' ? TRANSACTION_TYPE.BANK 
            : 
            TRANSACTION_TYPE.PAYMENT
        );
        

        if (result.success) {
            return NextResponse.json({ message: 'Платеж успешно обработан' });
        } else {
            return NextResponse.json({ error: result.error }, { status: 400 });
        }
    } catch (error) {
        return NextResponse.json({ error: `Ошибка при обработке платежа: ${error}` }, { status: 500 });
    }
} 