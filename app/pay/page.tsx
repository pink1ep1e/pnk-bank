"use client";

import { Suspense } from 'react';
import { PaymentFailed } from '@/components/shared/payment/payment-failed';
import { PaymentLoader } from '@/components/shared/payment/payment-loading';
import { PaymentPending } from '@/components/shared/payment/payment-pending';
import { PaymentSuccess } from '@/components/shared/payment/payment-success';
import { changePaymentStatus } from '@/lib/payment-system';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams, notFound } from 'next/navigation';
import { useEffect, useState } from 'react';

function PayContent() {
    const searchParams = useSearchParams();
    const [paymentStatus, setPaymentStatus] = useState('');
    const [createdAtStatus, setCreatedAtStatus] = useState('');
    const [loading, setLoading] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [reason, setReason] = useState('');

    const router = useRouter();

    const { data: session, status } = useSession();
    const paymentId = searchParams.get('paymentId');
    const amount = searchParams.get('amount');
    const recipient = searchParams.get('recipient');
    const description = searchParams.get('description');
    const shopUrl = searchParams.get('shopUrl');

    useEffect(() => {
        if (!paymentId || !recipient || !amount || !description || status === 'unauthenticated') return;

        const fetchPaymentStatus = async () => {
            try {
                const response = await fetch(`/api/payment/status?paymentId=${paymentId}&recipient=${recipient}&amount=${amount}&description=${description}`);
                const data = await response.json();
                setPaymentStatus(data.status);
                setCreatedAtStatus(data.createdAt);
            } catch (error) {
                console.error('Ошибка при получении статуса платежа:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPaymentStatus();
    }, [paymentId, recipient, amount, description, status]);

    useEffect(() => {
        const checkPaymentTimeout = () => {
            const now = new Date();
            const createdAtDate = new Date(createdAtStatus);
            const timeDifference = (now.getTime() - createdAtDate.getTime()) / 1000;

            if (timeDifference > 600) {
                if (paymentId) {
                    setPaymentStatus('FAILED');
                    changePaymentStatus(paymentId, 'FAILED');
                }
                setReason("Время ожидания платежа истекло.");
            }
        };

        const interval = setInterval(checkPaymentTimeout, 1000);

        return () => clearInterval(interval);
    }, [paymentId, createdAtStatus]);

    const handlePayment = async () => {
        if (!paymentId || !amount || !recipient || !description) return;

        setIsLoading(true);

        try {
            const response = await fetch('/api/payment/process', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    paymentId: paymentId,
                    amount: parseFloat(amount),
                    sender: Number(session?.user?.id),
                    recipient,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setPaymentStatus('SUCCESS');
            } else {
                setPaymentStatus('FAILED');
                setReason(data.error);
            }
        } catch (error) {
            console.error('Ошибка при обработке платежа:', error);
            setPaymentStatus('FAILED');
        } finally {
            setIsLoading(false);
        }
    };

    if (loading) {
        return <PaymentLoader/>;
    }

    if (status === 'unauthenticated') {
        router.push('/login');
        return null;
    }

    if (!paymentId || !amount || !recipient || !description || !shopUrl) {
        return notFound();
    }

    const fullShopUrl = `${shopUrl}?payment_id=${paymentId}`;

    if (paymentStatus === 'NOT_FOUND') {
        return notFound();
    }

    if (paymentStatus === 'SUCCESS') {
        return <PaymentSuccess paymentId={paymentId} amount={Number(amount)} recipient={recipient} shopUrl={fullShopUrl}/>;
    }

    if (paymentStatus === 'FAILED') {
        return <PaymentFailed paymentId={paymentId} amount={Number(amount)} recipient={recipient} shopUrl={fullShopUrl} reason={reason}/>;
    }

    if (String(paymentStatus) === 'PENDING') {
        return (
            <div className='bg-slate-50'>
                <PaymentPending 
                    isLoading={isLoading}
                    paymentId={paymentId} 
                    amount={Number(amount)} 
                    recipient={recipient} 
                    description={description} 
                    createdAt={new Date(createdAtStatus)} 
                    handlePayment={handlePayment}
                />
            </div>
        );
    }

    notFound();
    return null; 
}

export default function PayPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <PayContent />
        </Suspense>
    );
}