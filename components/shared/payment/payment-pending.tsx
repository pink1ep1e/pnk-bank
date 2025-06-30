'use client';

import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";
import React, { useState, useEffect } from "react"
import { ClipLoader } from 'react-spinners';

interface Props {
    paymentId: string;
    amount: number;
    recipient: string;
    description: string;
    handlePayment: () => void;
    className?: string;
    isLoading: boolean;
    createdAt: Date;
}

export const PaymentPending: React.FC<Props> = ({ 
    paymentId,
    amount,
    recipient,
    description,
    handlePayment,
    isLoading,
    createdAt,
}) => {
    const [timeLeft, setTimeLeft] = useState(() => {
        // Вычисляем оставшееся время от createdAt (максимум 10 минут)
        const now = new Date();
        const createdTime = new Date(createdAt).getTime();
        const elapsedTime = Math.floor((now.getTime() - createdTime) / 1000);
        return Math.max(0, 600 - elapsedTime); // 600 секунд = 10 минут
    });

    useEffect(() => {
        if (timeLeft === 0) return;

        const timer = setTimeout(() => {
            setTimeLeft(timeLeft - 1);
        }, 1000);

        return () => clearTimeout(timer);
    }, [timeLeft]);

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    return (
        <div className="flex items-center justify-center min-h-screen bg-slate-50">
            <div className="flex flex-col items-center">
                <div className="flex justify-start items-center gap-1 mb-2">
                    <p className="text-[35px] font-semibold pt-1">pnk</p>
                    <div className="flex bg-black text-white rounded-full text-[30px] px-5 font-semibold">
                        <p>pay</p>
                    </div>
                </div>
                <p className="text-[20px] text-slate-700 mb-4">Завершите платеж в течении <span className="font-semibold text-black text-[22px]">{minutes}:{seconds < 10 ? `0${seconds}` : seconds}</span> минут</p>
                <div className="bg-white rounded-[20px] w-[500px] shadow-lg px-7 py-6 animate-fade-in">

                    <div className="flex justify-center items-center">
                        <h1 className="text-[35px] font-semibold">{recipient}</h1>
                        <div className="flex gap-1 justify-end ml-auto">
                            <h1 className="text-[35px] font-bold">{amount}</h1>
                            <p className="text-[28px] font-semibold">ALM</p>
                        </div>
                    </div>
                    <div>
                        <p className="text-[20px] text-slate-700 mt-2 text-center">{description}</p>
                    </div>
                    <div className="flex justify-center items-center mb-6 mt-4">
                        <Button 
                            className="text-[20px] h-[50px] py-2.5 w-[350px]" 
                            onClick={handlePayment}  
                            type="submit"
                            disabled={isLoading}
                        >
                            {isLoading ? <ClipLoader color="#ffffff" size={25} /> : 'Оплатить'}
                        </Button>
                    </div>
                    <div className="flex justify-center items-center gap-4">
                        <div className="bg-black p-2 rounded-[12px]">
                            <Lock className="w-[25px] text-white h-[25px]" />
                        </div>
                        <p className="text-[16px]">Данные защищены по стандарту pnk guard. Мы храним ваши данные и не передаем их продавцу.</p>
                    </div>
                </div>
                <p className="text-[18px] text-slate-700 mt-6">ID платежа: {paymentId}</p>
            </div>
        </div>
    )
}