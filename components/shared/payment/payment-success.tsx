'use client';

import { Button } from "@/components/ui/button";
import { ChevronsUp } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from 'react';
import { ClipLoader } from 'react-spinners';

interface Props {
    paymentId: string;
    amount: number;
    recipient: string;
    shopUrl: string;
    className?: string;
}

export const PaymentSuccess: React.FC<Props> = ({ 
    paymentId,
    amount,
    shopUrl, 
    recipient,
}) => {
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000); 

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="flex items-center justify-center min-h-screen bg-slate-50">
            <div className="flex flex-col items-center">
                <div className="flex justify-start items-center gap-1 mb-2">
                    <p className="text-[35px] font-semibold pt-1">pnk</p>
                    <div className="flex bg-black text-white rounded-full text-[30px] px-5 font-semibold">
                        <p>pay</p>
                    </div>
                </div>
                <p className="text-[20px] text-slate-700 mb-4">Платеж успешно завершен</p>
                <div className="relative bg-black/10 backdrop-blur-sm rounded-[20px] animate-fade-in w-[500px] shadow-xl px-7 py-6 overflow-hidden">
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-xl"></div>
                    <div className="absolute inset-0 flex items-center justify-center z-50">
                        {isLoading ? (
                            <ClipLoader color="#fff" size={60} />
                        ) : (
                            <div className="flex flex-col items-center gap-4 opacity-0 animate-fade-in">
                                <div className="rounded-[12px] drop-shadow-lg">
                                    <ChevronsUp size={80} className="text-white drop-shadow-sm" style={{ filter: 'drop-shadow(0 0 2px black)' }}/>
                                </div>
                                <span className="text-[35px] font-bold text-white drop-shadow-sm" style={{ textShadow: '0 0 2px black' }}>Оплачено</span>
                            </div>
                        )}
                    </div>
                    <div className="flex justify-center items-center">
                        <h1 className="text-[35px] font-semibold">{recipient}</h1>
                        <div className="flex gap-1 justify-end ml-auto">
                            <h1 className="text-[35px] font-bold">{amount}</h1>
                            <p className="text-[28px] font-semibold">ALM</p>
                        </div>
                    </div>
                    <div className="mt-4">
                        <div className="flex gap-1 justify-center m-auto bg-black/10 rounded-[20px] w-[400px] h-[20px]"></div>
                        <div className="flex gap-1 mt-2 justify-center m-auto bg-black/10 rounded-[20px] w-[300px] h-[20px]"></div>
                    </div>
                    <div className="flex justify-center items-center mb-6 mt-4">
                        <Button 
                            className="text-[20px] h-[50px] py-2.5 w-[350px]" 
                            type="submit"
                        >
                            {/* Оплатить */}
                        </Button>
                    </div>
                    <div className="flex justify-center items-center gap-4">
                        <div className="bg-black p-2 rounded-[12px]">
                            <div className="w-[25px] h-[25px]"></div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="flex gap-1 justify-center m-auto bg-black/10 rounded-[20px] w-[400px] h-[30px]"></div>
                            <div className="flex gap-1 justify-center m-auto bg-black/10 rounded-[20px] w-[400px] h-[20px]"></div>
                        </div>
                    </div>
                </div>
                <p className="text-[18px] text-slate-700 mt-6">ID платежа: {paymentId}</p>
                <Button 
                    className="text-[18px] rounded-[12px] mt-2 h-[40px] py-2.5 w-[300px]" 
                    onClick={() => router.push(shopUrl)}
                    type="submit"
                >
                    {'<-'} Вернуться в магазин
                </Button>
            </div>
        </div>
    )
}