'use client';

import { cn } from "@/lib/utils";
import { Percent, WalletMinimal, Zap } from "lucide-react";
import React from 'react';

interface Props {
    className?: string;
}

export const AdvantagesBlock: React.FC<Props> = ({ className }) => {
    return (
        <>
            <div className={cn("flex flex-col md:flex-row justify-center items-center gap-4 mr-4 ml-4 md:mr-0 md:ml-0 md:gap-10 mt-10 md:mt-20", className)}>
                <div className="flex flex-col items-center md:items-start border rounded-[20px] border-black p-4 md:p-8 md:pr-12 md:pl-12 w-full md:w-auto">
                    <WalletMinimal className="w-12 h-12 md:w-20 md:h-20" />
                    <p className="text-[24px] md:text-[36px] mt-2 font-bold">Бесплатно</p>
                    <p className="text-[16px] md:text-[25px]">открытие и обслуживание</p>
                </div>
                <div className="flex flex-col items-center md:items-start border rounded-[20px] border-black p-4 md:p-8 md:pr-12 md:pl-12 w-full md:w-auto">
                    <Percent className="w-12 h-12 md:w-20 md:h-20" />
                    <p className="text-[24px] md:text-[36px] mt-2 font-bold">Без комиссии</p>
                    <p className="text-[16px] md:text-[25px]">пополнение и переводы</p>
                </div>
                <div className="flex flex-col items-center md:items-start border rounded-[20px] border-black p-4 md:p-8 md:pr-12 md:pl-12 w-full md:w-auto">
                    <Zap className="w-12 h-12 md:w-20 md:h-20"/>
                    <p className="text-[24px] md:text-[36px] mt-2 font-bold">Быстро</p>
                    <p className="text-[16px] md:text-[25px]">выпустим и доставим карту</p>
                </div>
            </div>
            <div className="flex flex-col justify-center items-center mt-8 md:mt-16 font-bold text-[32px] md:text-[60px]">
                <h1 className="text-black">8 000 000 000</h1>
                <p className="text-[20px] md:text-[50px] items-center">пользователей уже получают выгоду</p>
                <p className="text-[20px] md:text-[50px] items-center">с pnk Картой</p>
            </div>
            <div id="cabinet-info" className="flex flex-col md:flex-row justify-center mr-4 ml-4 md:mr-0 md:ml-0 gap-4 md:gap-10 items-center mt-8 md:mt-12">
                <div className="flex flex-col items-center md:items-start border rounded-[20px] border-black p-4 md:p-8 md:pr-12 md:pl-12 w-full md:w-auto">
                    <div className="bg-black rounded-[12px] md:rounded-[20px] w-12 h-12 md:w-[80px] md:h-[80px] flex justify-center items-center">
                        <h1 className="text-white font-bold text-[24px] md:text-[45px] mt-2">1</h1>
                    </div>
                    <p className="text-[24px] md:text-[36px] mt-2 font-bold">Заполнить анкету</p>
                    <p className="text-[16px] md:text-[25px]">Заполните анкету в приложении <br/> банка</p>
                </div>
                <div className="flex flex-col items-center md:items-start border rounded-[20px] border-black p-4 md:p-8 md:pr-12 md:pl-12 w-full md:w-auto">
                    <div className="bg-black rounded-[12px] md:rounded-[20px] w-12 h-12 md:w-[80px] md:h-[80px] flex justify-center items-center">
                        <h1 className="text-white font-bold text-[24px] md:text-[45px] mt-2">2</h1>
                    </div>
                    <p className="text-[24px] md:text-[36px] mt-2 font-bold">Закажите карту</p>
                    <p className="text-[16px] md:text-[25px]">Закажите pnk Карту. Доставим <br/> в офис банка или курьером</p>
                </div>
                <div className="flex flex-col items-center md:items-start border rounded-[20px] border-black p-4 md:p-8 md:pr-12 md:pl-12 w-full md:w-auto">
                    <div className="bg-black rounded-[12px] md:rounded-[20px] w-12 h-12 md:w-[80px] md:h-[80px] flex justify-center items-center">
                        <h1 className="text-white font-bold text-[24px] md:text-[45px] mt-2">3</h1>
                    </div>
                    <p className="text-[24px] md:text-[36px] mt-2 font-bold">Личный кабинет</p>    
                    <p className="text-[16px] md:text-[25px]">Зайдите в личный кабинет и <br/> пользуйтесь нашими услугами</p>
                </div>
            </div>
        </>
    )
}

