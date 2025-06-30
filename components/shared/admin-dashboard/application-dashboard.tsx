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
        <div className="border border-primary mt-4 bg-white rounded-[20px] border-black w-full h-fit pt-[30px] pb-[30px] pr-[45px] pl-[45px]">        
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