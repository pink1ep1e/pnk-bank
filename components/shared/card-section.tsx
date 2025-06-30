'use client';

import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Wallet } from "lucide-react";
import Image from 'next/image';
import React, { useState } from 'react';
import { useRouter } from "next/navigation";

interface Props {
    className?: string;
}

export const CardSection: React.FC<Props> = ({ className }) => {
    const router = useRouter()
    const [isAnimating, setIsAnimating] = useState(false);

    const handleAnimation = () => {
        setIsAnimating(!isAnimating);
    };

    return (
       <div className={cn("flex flex-col md:flex-row justify-center items-center gap-6 md:gap-10 mt-8 md:mt-16", className)}>
            <div className="flex flex-col p-4 md:p-8 w-full md:w-[800px] h-fit gap-2 md:gap-4">
                <div className="text-[32px] md:text-[50px] text-black">
                    <p className="font-bold leading-tight">Банковская pnk Карта <br/>c выгодой до 100%</p>
                </div>
                <p className="text-black text-[16px] md:text-[25px]">
                    Оформите бесплатную карту pnk Банка и наслаждайтесь удобством расчетов в магазинах.
                    С этой картой вы сможете без комиссии переводить деньги, 
                    оплачивать штрафы и совершать другие финансовые операции. 
                </p>
                <Button onClick={() => router.push('/register')} className="rounded-[12px] text-[16px] md:text-[20px] w-full md:w-[250px] mt-3 h-[40px] md:h-[50px]" variant={'outline'}>
                    Стать клиентом <Wallet className="w-5 h-5 md:w-6 md:h-6" />
                </Button>
            </div>
            <div className="hidden md:flex flex-col md:w-[500px] h-fit gap-4 relative cursor-pointer" onClick={handleAnimation}>
                <Image 
                    src="/card-2.png"
                    alt="AVATAR ICON"
                    width={620}
                    height={390}
                    className={`rounded-[8px] z-0 w-full ${isAnimating ? 'pulse-animation' : 'pulse-animation-two'}`}
                    style={{ transform: 'rotate(7deg)' }}
                />
                <Image
                    src="/card-1.png"
                    alt="AVATAR ICON"
                    width={620}
                    height={390}
                    className={`rounded-[8px] top-10 md:top-20 right-10 md:right-20 absolute transform z-10 w-full ${isAnimating ? 'toback-animation' : 'toback-animation-two'}`}
                    style={{ transform: 'rotate(7deg)' }}
                />
            </div>
       </div>
    //    <div className={cn("flex flex-col md:flex-row justify-center items-center gap-6 md:gap-12 mt-8 md:mt-16", className)}>
    //         <div className="h-[350px] flex items-center justify-center">
    //             <div className="flex items-center font-semibold text-[24px] md:text-[350px] gap-12 select-none">
    //                 <h1>pnk</h1>
    //                 <h1>банк</h1>
    //             </div>
    //         </div>
    //    </div>
    )
}