'use client';

import React from "react"
import { Title } from "../title";   
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Notification } from "@prisma/client";
import { NotificationItem } from '@/components/shared/notification-item'
import { AlertTriangle } from "lucide-react";

interface Props {
    notifications: Notification[];
    className?: string;
}

export const NotificationDetails: React.FC<Props> = ({ className, notifications }) => {

    const sortedNotifications = [...notifications].sort((a, b) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    const groupedNotifications = sortedNotifications.reduce((acc, item) => {
        const dateKey = new Date(item.createdAt).toLocaleDateString("ru-RU", {
            day: "numeric",
            weekday: "long",
            month: "long",
        });
        if (!acc[dateKey]) {
            acc[dateKey] = [];
        }
        acc[dateKey].push(item);
        return acc;
    }, {} as Record<string, Notification[]>);

    return (
        <div className={cn("shadow-md border-primary bg-white rounded-[20px] border border-slate-200 w-full h-[400px] lg:h-[235px] pt-[15px] pb-[15px] pr-[25px] pl-[25px] lg:pt-[25px] lg:pb-[25px] lg:pr-[35px] lg:pl-[35px]", className)}>
            <Title className="font-extrabold" text="Уведомления" size='md'/>
            <ScrollArea className="h-[320px] lg:h-[150px] pr-3">
            {notifications.length === 0 ? (
                <div>
                    <p className="text-[18px] pt-4 text-[#434C55] text-center">У вас пока нет уведомлений, обязательно измените пароль и код-слово!</p>
                    <AlertTriangle className="m-auto" color="#434C55" size={64}/>
                </div>
            ) : (
                Object.entries(groupedNotifications).map(([dateKey, notifications]) => (
                    <div key={dateKey}>
                        <h2 className="text-[18px] font-medium text-[#434C55] mb-2">{dateKey}</h2>
                        {notifications.map((item) => (
                            <NotificationItem 
                                key={item.id}
                                id={item.id}
                                sender={item.sender}
                                message={item.message}
                                type={item.type}
                                createdAt={item.createdAt}
                            />
                        ))}
                    </div>
                ))
            )}
            </ScrollArea>
        </div>
    )
}