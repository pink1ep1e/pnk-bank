'use client';

import React from "react"
import Image from 'next/image';
import { Crown } from "lucide-react";

interface Props {
    id: number;
    admin: string;
    description: string;
    createdAt: Date;
}

export const LogItem: React.FC<Props> = ({ 
    id,
    admin,
    description, 
    createdAt
 }) => {
    const date = new Date(createdAt);

    return (    
        <div className="w-full rounded-[20px] p-3 bg-[#F5F7FA] mt-4 px-4 md:px-4 lg:px-[8px]">
            <div className="flex gap-3 justify-center items-center">
                <Image 
                    src={`https://minotar.net/avatar/${admin}`}
                    alt="AVATAR ICON"
                    width={70}
                    height={70}
                    className="rounded-[12px]"
                />
                <div className="w-full leading-none">
                    <div className="flex justify-start items-center gap-2 pb-2.5">
                        <Crown size={20}/>
                        <p className="font-regular text-[23px]">{admin}</p>
                        <p className="text-[23px] font-semibold">#{id}</p>
                    </div>
                    <h1 className="text-[18px]">{description}</h1>
                </div>
                <div className="w-[280px]">
                    <p className="font-semibold text-[18px] mb-1">Дата</p>
                    <h1 className="text-[16px]">{date.toLocaleString()}</h1>
                </div>
            </div>
        </div>
    )
}