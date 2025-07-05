'use client';

import React from "react"
import { cn } from "@/lib/utils";
import { User } from "@prisma/client";
import Image from 'next/image';

interface Props {   
    className?: string;
    user: User;
}

export const AdminHeader: React.FC<Props> = ({ className, user }) => {

    return (
        <div className={cn("my-[20px] pt-8", className)}>
            <div className="flex justify-start items-center">
                <div className="flex p-4 gap-4 border shadow-sm rounded-[20px] bg-white ">
                    <Image 
                        src={`https://minotar.net/avatar/${user.userName}`}
                        alt="AVATAR ICON"
                        width={75}
                        height={75}
                        className="rounded-[12px]"
                    />
                    <div className="flex flex-col justify-start items-start">
                        <p className="text-[24px]">{user.userName} #{user.id}</p>
                        <div className="flex justify-center items-center">
                            <a href="/cabinet" className="text-center bg-black rounded-[18px] text-white px-6 py-1">{'<-'} Назад в кабинет</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

