'use client';

import { cn } from "@/lib/utils";
import React from 'react';
import Image from 'next/image';

interface Props {
    className?: string;
}

export const StaffBlock: React.FC<Props> = ({ className }) => {
    return (
        <>
            <div className={cn("flex justify-center items-center gap-10 mt-14", className)}>
                <div className="flex flex-col">
                    <h1 className="text-black text-[32px] md:text-[42px] font-bold text-center">Сотрудники нашего банка: </h1>
                    <div className="flex flex-col md:flex-row justify-center items-center mt-[40px] gap-[30px] md:gap-[50px]">
                        <div className="flex w-full md:w-[400px] flex-col justify-center items-center">
                            <Image 
                                src={`https://minotar.net/avatar/pink1ep1e`}
                                alt="AVATAR ICON"
                                width={180}
                                height={180}
                                className="rounded-[20px] w-[120px] h-[120px] md:w-[180px] md:h-[180px]"
                            />
                            <h1 className="text-[28px] md:text-[35px] font-bold">pink1ep1e</h1>
                            <div className="text-center text-[20px] md:text-[25px]">
                                <p>Генеральный директор</p>
                                <p>Разработчик</p>
                            </div>
                        </div>
                        <div className="flex w-full md:w-[400px] flex-col justify-center items-center">
                            <Image 
                                src={`https://minotar.net/avatar/cLown`}
                                alt="AVATAR ICON"
                                width={180}
                                height={180}
                                className="rounded-[20px] w-[120px] h-[120px] md:w-[180px] md:h-[180px]"
                            />
                            <h1 className="text-[28px] md:text-[35px] font-bold">cLown</h1>
                            <div className="text-center text-[20px] md:text-[25px]">
                                <p>Зам. Генерального директора</p>
                                <p>Мобильный Разработчик</p>
                            </div>
                        </div>
                        <div className="flex w-full md:w-[400px] flex-col justify-center items-center">
                            <Image 
                                src={`https://minotar.net/avatar/re1nly`}
                                alt="AVATAR ICON"
                                width={180}
                                height={180}
                                className="rounded-[20px] w-[120px] h-[120px] md:w-[180px] md:h-[180px]"
                            />
                            <h1 className="text-[28px] md:text-[35px] font-bold">re1nly</h1>
                            <div className="text-center text-[20px] md:text-[25px]">
                                <p>Управляющий по финансам</p>
                                <p>Коллектор</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

