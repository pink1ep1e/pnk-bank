'use server';

import { prisma } from "@/prisma/prisma-client";
import { PAYMENT_STATUS, TRANSACTION_TYPE } from "@prisma/client";

export const savePayment = async (
    paymentId: string,
    amount: number,
    recipient: string,
    shopUrl: string,
    description: string,
    status: PAYMENT_STATUS,
) => {
    try {
        const payment = await prisma.payment.create({
            data: {
                paymentId: paymentId,
                amount: amount,
                recipient: recipient,
                shopUrl: shopUrl,
                description: description,
                status: status,
            }
        });
        return payment;
    } catch (error) {
        console.error('Ошибка при сохранении платежа:', error);
        return null;
    }
};

export const getPaymentStatus = async (paymentId: string, recipient: string, amount: number, description: string) => {
    const payment = await prisma.payment.findFirst({ 
    where: { 
        paymentId: paymentId, 
        recipient: recipient,
        amount: amount,
        description: description, 
    } 
    });

    if (!payment) {
        return { status: 'NOT_FOUND' }; 
    }

    return { status: payment.status, createdAt: payment.createdAt };
};

export const getPayCheck = async (paymentId: string) => {
    const payment = await prisma.payment.findFirst({ 
    where: { 
        paymentId: paymentId, 
    } 
    });

    if (!payment) {
        return { status: 'NOT_FOUND' }; 
    }
    
    return { status: payment.status, createdAt: payment.createdAt };
};

export const changePaymentStatus = async (paymentId: string, status: PAYMENT_STATUS) => {
    const payment = await prisma.payment.update({ 
    where: { 
        paymentId: paymentId, 
    },
    data: {
        status: status
    }
    });

    if (!payment) {
        return { status: 'NOT_FOUND' }; 
    }
    
    return { status: payment.status, createdAt: payment.createdAt };
};


export const processPayment = async (
    paymentId: string,
    amount: number,
    sender: number,
    recipient: string,
    type: TRANSACTION_TYPE,
) => {
    try {
        // Проверяем, достаточно ли средств у отправителя
        const senderUser = await prisma.user.findUnique({
            where: { id: Number(sender) },
        });

        const senderCard = await prisma.card.findFirst({
            where: {
                ownerId: Number(sender)
            }
        })

        if (!senderCard) {
            await prisma.payment.update({
                where: { paymentId: paymentId },
                data: { 
                    sender: String(sender),
                    status: PAYMENT_STATUS.FAILED 
                },
            });
            return { success: false, error: 'Ошибка при обработке платежа, нет карты!' };
        }

        if (!senderUser || senderCard.balance < amount) {
            await prisma.payment.update({
                where: { paymentId: paymentId },
                data: { 
                    sender: String(sender),
                    status: PAYMENT_STATUS.FAILED 
                },
            });

            return { success: false, error: 'Недостаточно средств на счете' };
        }

        const recipientUser = await prisma.user.findUnique({
            where: {
                userName: recipient,
            },
            select: {
                id: true,
                card: true
            }
        });

        if (!recipientUser) {
            return { success: false, error: 'Получатель не найден' };
        }

        // Списываем средства у отправителя
        await prisma.card.update({
            where: { id: senderCard.id },
            data: { balance: { decrement: amount } },
        });

        // Начисляем средства получателю
        await prisma.card.update({
            where: { id: recipientUser?.card[0].id },
            data: { balance: { increment: amount } },
        });

        // Обновляем статус платежа
        await prisma.payment.update({
            where: { paymentId: paymentId },
            data: { 
                sender: String(sender),
                status: PAYMENT_STATUS.SUCCESS 
            },
        });

        await prisma.transactions.create({
            data: {
                sender: senderUser.userName,
                recipient: recipient,
                amount: amount,
                commission: 0,
                message: 'Оплата через pnk pay',
                type: type,
                transactionSenderId: senderUser.id,
                transactionRecipientId: recipientUser.id,
            }
        })

        return { success: true };
    } catch (error) {
        console.error('Ошибка при обработке платежа:', error);

        await prisma.payment.update({
            where: { paymentId: paymentId },
            data: { 
                sender: String(sender),
                status: PAYMENT_STATUS.FAILED 
            },
        });

        return { success: false, error: 'Ошибка при обработке платежа' };
    }
};