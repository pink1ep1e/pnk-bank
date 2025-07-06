'use client';

import { Application } from "@prisma/client";
import React from "react"
import { AlertTriangle, AudioLines, Bell } from "lucide-react";

interface Props {
    initialApplications: Application[];
}

export const AdminLogs: React.FC<Props> = ({ initialApplications }) => {

    return (
        <div className="shadow-md border-primary bg-white rounded-[20px] border border-slate-200 w-full h-fit pt-[20px] pb-[15px] pr-[25px] pl-[25px] lg:pt-[30px] lg:pb-[30px] lg:pr-[45px] lg:pl-[45px]">        
            <div className="flex">
                <div className="flex flex-col justify-start items-start">
                    <Title className="font-extrabold" text="Заявки на создание личного кабинета" size='md'/>
                    <p className="font-regular text-start text-sm sm:text-base lg:text-lg">Заявки на создание счета.</p>
                </div>
            </div>
            <div className="text-[18px] mt-2">
                <ScrollArea className="h-[500px] pr-3">
                    {
                        applications.length === 0 ? (
                            <div className="flex justify-center items-center mt-4">
                                <div className="justify-center items-center text-center">
                                    <p className="text-[#434C55] text-[16px] font-medium">
                                        К сожалению, на данный момент нет активных заявок на создание личного кабинета.
                                    </p>
                                    <AlertTriangle className="m-auto" color="#434C55" size={128}/>
                                </div>
                            </div>
                        ) : (
                        Array.isArray(applications) && applications
                            .sort((a, b) => {
                                if (a.STATUS === 'WAITING' && b.STATUS !== 'WAITING') return -1;
                                if (b.STATUS === 'WAITING' && a.STATUS !== 'WAITING') return 1;
                                return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
                            })
                            .map((item) => (
                            <ApplicationItem 
                                key={item.id}
                                id={item.id}
                                userName={item.userName}
                                telegram={item.telegram}
                                discord={item.discord}
                                status={item.STATUS}
                                createdAt={item.createdAt}
                            />
                        )))
                    }
                </ScrollArea>
            </div>
        </div>
    )
}