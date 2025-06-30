'use client';

import { cn } from "@/lib/utils";
import React from 'react';
import Image from 'next/image';

interface Props {
    className?: string;
}

export const Footer: React.FC<Props> = ({ className }) => {
    return (
        <>
            <div className={cn("flex justify-center items-center gap-10 mt-20 border-t-[1px] border-black ", className)}>
                <div className="flex flex-col justify-center items-start w-[1250px] p-8">
                    <div className="flex justify-center items-center gap-4">
                        <div>
                            <Image 
                                src='/pnk-id.png'
                                alt="AVATAR ICON"
                                width={120}
                                height={120}
                                className="rounded-[20px"
                            />
                        </div>
                        <div className="flex items-center md:flex-row font-semibold text-[30px] gap-2 none-select">
                            <h1>pnk</h1>
                            <h1>банк</h1>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="mt-2">
                            <p className="text-[16px]">
                            Данный сайт использует файлы «cookie», с целью персонализации сервисов и повышения удобства пользования веб-сайтом. 
                            «Cookie» представляют собой небольшие файлы, содержащие информацию о предыдущих посещениях веб-сайта. 
                            Если вы не хотите использовать файлы «cookie», измените настройки браузера.
                            </p>
                        </div>
                        <div className="mt-2">
                            <h1 className="font-bold text-[16px]">Поддержка клиентов</h1>
                            <p className="text-[16px]">Поддержка клиентов работает с 14:00 по 23:00, обращаться в @pnk_support (Telegram)</p>
                        </div>
                        <div className="mt-2">
                            <h1 className="font-bold text-[16px]">Данный банк не являеться реальным, финансовые операции производяться по внутреигровой валюте.</h1>
                        </div>
                        <div className="mt-8">
                            <h1 className="text-[16px]">2025 «ПНК Банк»</h1>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

