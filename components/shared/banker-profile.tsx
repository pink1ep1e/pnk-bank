'use client';

import React, { useEffect, useState } from "react"
import { Title } from "./title";
import Image from 'next/image';
import { ChevronRight, Landmark } from "lucide-react";
import { Courier, User } from "@prisma/client";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";


interface Props {
    className?: string;
    user: User;
    banker: Courier;
}

export const BankerProfile: React.FC<Props> = ({ className, user, banker }) => {
    const router = useRouter();

    const [isSoundEnabled, setIsSoundEnabled] = useState(false);

    useEffect(() => {
        const soundSetting = localStorage.getItem('isSoundEnabled');
        if (soundSetting === 'true') {
            setIsSoundEnabled(true);
        }
    }, []);

    const toggleSound = () => {
        const newSoundSetting = !isSoundEnabled;
        setIsSoundEnabled(newSoundSetting);
        localStorage.setItem('isSoundEnabled', newSoundSetting.toString());
    };


    return (
        <div className={cn("shadow-md border-primary bg-white rounded-[20px] border border-slate-200 w-full h-fit pt-[20px] pb-[15px] pr-[25px] pl-[25px] lg:pt-[30px] lg:pb-[30px] lg:pr-[45px] lg:pl-[45px]", className)}>
            <Title className="font-extrabold" text="Профиль банкира" size='md'/>
                <div className="flex mt-2">
                    <Image 
                        src={`https://minotar.net/avatar/${user.userName}`}
                        alt="AVATAR ICON"
                        width={100}
                        height={100}
                        className="rounded-[20px]"
                    />
                    <div className="pl-4 w-full pt-[5px]">
                        <div className="flex gap-2">
                            <p 
                                className="text-[25px] font-medium"
                            >
                                {user.userName}
                            </p>
                            <Landmark className="pt-1.5" color="black" size={28}/>
                            <div className="flex items-center justify-center gap-2 ml-auto">
                                <div className="flex justify-center items-center w-full gap-2 rounded-[25px] ">
                                    <p className="font-semibold text-[20px] pt-1">Рейтинг</p>
                                    <div className="bg-black text-white px-[14px] text-[20px] rounded-[20px]">
                                        <p className="pt-0.5">{banker.rating}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex">
                            <div className="flex justify-start mt-1 items-center w-full gap-2 rounded-[25px] ">
                                <div className="bg-black text-white px-[14px] text-[20px] rounded-[20px]">
                                    <p className="pt-0.5"> 
                                        {
                                            user.role === "MODER" ?
                                            "Модератор"
                                            :
                                            "Администратор"
                                        }
                                    </p>
                                </div>
                            </div>
                            <div className="flex justify-end mt-1 items-center w-full gap-2 rounded-[25px] ">
                                <div className="bg-black text-white px-[14px] text-[20px] rounded-[20px]">
                                    <p className="pt-0.5">{banker.score} заявок</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-start items-center gap-4">
                    <div className="rounded-[20px] gap-4 bg-primary/5 p-[6px] lg:p-[10px] mt-4">
                        <div onClick={() => router.push('/cabinet')} className="flex cursor-pointer hover:bg-primary/5 rounded-[12px] p-2 justify-start items-center gap-3">
                            <div className="items-center"> 
                                <p className="text-[18px] lg:text-[18px] text-left font-regular">Выход в кабинет</p>
                                <p className="text-[14px] lg:text-[16px] text-left font-regular text-[#434C55]">Возвращает обратно в кабинет</p>
                            </div>
                            <div className="flex justify-end items-end ml-auto">
                                <ChevronRight className="pr-auto" size={20}/>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-[20px] gap-4 bg-primary/5 p-[6px] lg:p-[10px] mt-4">
                            {isSoundEnabled ? 
                            <div onClick={toggleSound}  className="flex cursor-pointer hover:bg-primary/5 rounded-[12px] p-2 justify-start items-center gap-3">
                                <div className="items-center"> 
                                    <p className="text-[18px] lg:text-[18px] text-left font-regular">Отключить звук</p>
                                    <p className="text-[14px] lg:text-[16px] text-left font-regular text-[#434C55]">Отключает уведомления о заявках</p>
                                </div>
                                <div className="flex justify-end items-end ml-auto">
                                    <ChevronRight className="pr-auto" size={20}/>
                                </div> 
                            </div>
                            :
                            <div onClick={toggleSound}  className="flex cursor-pointer hover:bg-primary/5 rounded-[12px] p-2 justify-start items-center gap-3">
                                <div className="items-center"> 
                                    <p className="text-[18px] lg:text-[18px] text-left font-regular">Включить звук</p>
                                    <p className="text-[14px] lg:text-[16px] text-left font-regular text-[#434C55]">Включет уведомления о заявках</p>
                                </div>
                                <div className="flex justify-end items-end ml-auto">
                                    <ChevronRight className="pr-auto" size={20}/>
                                </div>
                            </div>
                            }
                    </div>
                </div>
        </div>
    )
}