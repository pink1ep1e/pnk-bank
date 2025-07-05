'use client';

import { Application } from "@prisma/client";
import React from "react"
import { Title } from "../title";
import { ApplicationItem } from "../application-item";
import { AlertTriangle } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Props {
    applications: Application[];
}

export const ApplicationDashboard: React.FC<Props> = ({ applications }) => {
    return (
        <div className="shadow-md border-primary bg-white rounded-[20px] border border-slate-200 w-full h-fit pt-[20px] pb-[15px] pr-[25px] pl-[25px] lg:pt-[30px] lg:pb-[30px] lg:pr-[45px] lg:pl-[45px]">        
            <Title className="font-extrabold" text="Заявки на создание личного кабинета" size='md'/>
            <div className="flex gap-6">
                <p className="font-regular text-sm sm:text-base lg:text-lg">Заявки на создание счета.</p>
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
                        applications
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