'use client';

import { Card } from "@prisma/client";
import React, { useState } from 'react';
import { Title } from "../title";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import confetti from 'canvas-confetti';
// import { RemittanceModal } from "../remittance-modal";
import { useRouter } from "next/navigation";

interface Props {
    card: Card;
    className?: string;
}

export const CardDetails: React.FC<Props> = ({ card, className }) => {

    const router = useRouter();
    const [clickCount, setClickCount] = useState(0);
    // const [isRemittanceModalOpen, setIsRemittanceModalOpen] = useState(false);

    const handleClick = () => {
        setClickCount(prev => prev + 1);

        if (clickCount + 1 === 3) {
            confetti({
                particleCount: 100,
                spread: 200,
                origin: { y: 0.6 },
            });
            setClickCount(0);
        }
    };

    return (
        <div className="shadow-md border-primary bg-white rounded-[20px] border border-slate-200 w-full pt-[15px] pb-[15px] pr-[25px] pl-[25px] lg:pt-[25px] lg:pb-[25px] lg:pr-[35px] lg:pl-[35px] ">
            <div className="flex justify-start items-center">
                <Title className="font-extrabold" text="Мои финансы" size='md'/>
                <Button 
                    onClick={() => router.push('/cabinet/level')}
                    className="p-0 pt-0.5 px-4 ml-auto text-center rounded-[22px] text-[12px] md:text-[15px] font-semibold h-[30px] "
                >
                    Уровень счета {'->'}
                </Button>
            </div>
            <div className={cn("rounded-[20px] bg-primary/5 p-[20px] lg:p-[25px] mt-2", className)}>
                <div className="grid grid-cols-2 gap-5 items-center">
                    <div>
                        <h1 className="text-slate-600 text-[18px] lg:text-[22px]">Алмазный счет</h1>
                        <div className="flex m-auto">
                            {
                                card.balance >= 1000000 ?
                                <p className="font-bold text-[16px] lg:text-[25px] pr-[5px]">{card.balance.toLocaleString('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace(/,/g, '|').replace(/\./g, ',').replace(/\|/g, '.')}</p>
                                :
                                <p className="font-bold text-[20px] lg:text-[25px] pr-[5px]">{card.balance.toLocaleString('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace(/,/g, '|').replace(/\./g, ',').replace(/\|/g, '.')}</p>
                            }
                            <p className="text-[20px]">ALM</p>
                        </div>
                    </div>
                    <div className="flex justify-end items-end">
                        <div 
                            className="relative bg-black rounded-[12px] w-[110px] h-[70px] p-[9px] cursor-pointer select-none"
                            onClick={handleClick}
                        >
                            <div className="font-bold text-white w-full">
                                <p>pnk бaнк</p>
                                <p className="text-[14px] font-semibold absolute bottom-2 right-2">{String(card.cardNumber).slice(-4)}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <Button 
                    // onClick={() => toast.success('Обратитесь в банк или к представителю банка для пополнения счета')} 
                    className="w-full mt-5 p-2 text-[20px]"
                >
                    Пополнить
                </Button>

                {/* <RemittanceModal 
                    isOpen={isRemittanceModalOpen} 
                    onClose={() => setIsRemittanceModalOpen(false)} 
                /> */}
            </div>
        </div>
    )
}